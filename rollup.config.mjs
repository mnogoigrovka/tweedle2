import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import sucrase from '@rollup/plugin-sucrase';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json' assert { type: 'json' };

const projectFolder = process.cwd();

const plugins = [
	sucrase({
		include: ["**/*.ts"],
		transforms: ['typescript']
	}),
	sourcemaps(),
	nodeResolve({
		browser: true,
		preferBuiltins: false,
	}),
	commonjs({}),
];

const compiled = (new Date()).toUTCString().replace(/GMT/g, 'UTC');
let banner = [
	`/* eslint-disable */`,
	` `,
	`/*!`,
	` * ${pkg.name} - v${pkg.version}`,
	` * Compiled ${compiled}`,
	` *`,
	` * ${pkg.name} is licensed under the MIT License.`,
	` * http://www.opensource.org/licenses/mit-license`,
	` * `,
	` * Copyright 2019-2021, ${pkg.author}, All Rights Reserved`,
	` */`,
].join('\n');

const {
	main,
	module,
	bundle,
	namespace,
	peerDependencies,
	dependencies
} = pkg;


const input = path.join(projectFolder, 'src/index.ts');
const externalForMain = []
	.concat(Object.keys(peerDependencies || {}))
	.concat(Object.keys(dependencies || {}))
const externalForBrowser = externalForMain.filter((dep) => !Object.keys(dependencies || {})?.includes(dep));

//#region Main (CJS)
// Main (CJS, for NPM)
const configForMain = {
	plugins,
	external: externalForMain,
	input,
	output: {
		banner,
		file: path.join(projectFolder, main),
		format: 'cjs',
		sourcemap: true
	}
};
//#endregion

//#region ES
// ES modules
const configForES = {
	plugins,
	external: externalForBrowser,
	input,
	output: {
		banner,
		file: path.join(projectFolder, module),
		format: 'esm',
		sourcemap: true
	}
}


const configForESmin = {
	plugins: [...plugins, terser({
		output: {
			comments: (node, comment) => comment.line === 1,
		},
	})],
	input,
	external: externalForBrowser,
	output: {
		banner,
		file: path.join(projectFolder, module).replace(/\.js$/, '.min.js'),
		format: 'esm',
		sourcemap: true
	},
	treeshake: false,
}
//#endregion

//#region UMD
const name = pkg.name.replace(/[^a-z]+/g, '_');
const ns = namespace;

// Assign to namespace
let footer;

footer = `if (typeof ${name} !== 'undefined') { Object.assign(this.${ns}, ${name}); }`


// Allow namespaces upto 2-depth (like PIXI.tilemap)
if (ns.includes('.')) {
	const base = ns.split('.')[0];

	banner += `\nthis.${base} = this.${base} || {};`;
}

banner += `\nthis.${ns} = this.${ns} || {};`;


// Name for the umd file
const file = path.join(projectFolder, bundle);

const configForUMD = {
	input,
	external: externalForBrowser,
	output: {
		banner,
		file,
		format: 'umd',
		name,
		footer,
		sourcemap: true
	},
	treeshake: false,
	plugins
}


// UMD .min.js on production
const configForUMDmin = {
	input,
	external: externalForBrowser,
	output: {
		banner,
		file: file.replace(/\.js$/, '.min.js'),
		format: 'umd',
		name,
		footer,
		sourcemap: true
	},
	treeshake: false,
	plugins: [...plugins, terser({
		output: {
			comments: (node, comment) => comment.line === 1,
		},
	})],
}
//#endregion

export default [configForMain, configForES, configForESmin, configForUMD, configForUMDmin];
