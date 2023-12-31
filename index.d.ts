/**
 * HCL color format
 * Alpha, Hue, Chroma, Luminance.
 */
export declare interface AHCL {
    a: number;
    h: number;
    c: number;
    l: number;
}

/**
 * HSV color format
 * Alpha, Hue, Saturation, Value.
 */
export declare interface AHSV {
    a: number;
    h: number;
    s: number;
    v: number;
}

/**
 * ARGB color format
 * Alpha, Red, Green, Blue.
 */
export declare interface ARGB {
    a: number;
    r: number;
    g: number;
    b: number;
}

/**
 * Default values used **during tween creation**.
 * Allows to change the default values for all tweens.
 */
export declare const DEFAULTS: IDefaultValues;

/**
 * The Ease class provides a collection of easing functions.
 *
 * These functions take in a parameter between 0 and 1 as the ratio and give out a new ratio.
 *
 * These are [Robert Penner](http://www.robertpenner.com/easing_terms_of_use.html)'s optimized formulas.
 *
 * Need help picking one? [Check this out!](https://easings.net/)
 */
export declare const Easing: {
    Step: {
        None(amount: number): number;
    };
    Linear: {
        None(amount: number): number;
    };
    Quadratic: {
        In(amount: number): number;
        Out(amount: number): number;
        InOut(amount: number): number;
    };
    Cubic: {
        In(amount: number): number;
        Out(amount: number): number;
        InOut(amount: number): number;
    };
    Quartic: {
        In(amount: number): number;
        Out(amount: number): number;
        InOut(amount: number): number;
    };
    Quintic: {
        In(amount: number): number;
        Out(amount: number): number;
        InOut(amount: number): number;
    };
    Sinusoidal: {
        In(amount: number): number;
        Out(amount: number): number;
        InOut(amount: number): number;
    };
    Exponential: {
        In(amount: number): number;
        Out(amount: number): number;
        InOut(amount: number): number;
    };
    Circular: {
        In(amount: number): number;
        Out(amount: number): number;
        InOut(amount: number): number;
    };
    Elastic: {
        In(amount: number): number;
        Out(amount: number): number;
        InOut(amount: number): number;
    };
    Back: {
        In(amount: number): number;
        Out(amount: number): number;
        InOut(amount: number): number;
    };
    Bounce: {
        In(amount: number): number;
        Out(amount: number): number;
        InOut(amount: number): number;
    };
};

/**
 * The type for a function that takes a number between 0 and 1 and returns another number between 0 and 1
 */
export declare type EasingFunction = (amount: number) => number;

/**
 * A group is a class that allows you to manage many tweens from one place.
 *
 * A tween will ALWAYS belong to a group. If no group is assigned it will default to the static shared group: `Group.shared`.
 */
export declare class Group {
    private _tweens;
    private static _shared;
    /**
     * A tween without an explicit group will default to this shared static one.
     */
    static get shared(): Group;
    private _paused;
    /**
     * A paused group will skip updating all the asociated tweens.
     * _To control all tweens, use {@link Group.getAll} to get an array with all tweens._
     * @returns returns true if this group is paused.
     */
    isPaused(): boolean;
    /**
     * Pauses this group. If a group was already paused, this has no effect.
     * A paused group will skip updating all the asociated tweens.
     * _To control all tweens, use {@link Group.getAll} to get an array with all tweens._
     */
    pause(): void;
    /**
     * Resumes this group. If a group was not paused, this has no effect.
     * A paused group will skip updating all the asociated tweens.
     * _To control all tweens, use {@link Group.getAll} to get an array with all tweens._
     */
    resume(): void;
    private _lastUpdateTime;
    /**
     * Function used by the group to know what time is it.
     * Used to calculate the deltaTime in case you call update without the parameter.
     */
    now: () => number;
    /**
     * Returns all the tweens in this group.
     *
     * _note: only **running** tweens are in a group._
     * @returns all the running tweens.
     */
    getAll(): Array<Tween<any>>;
    /**
     * Removes all the tweens in this group.
     *
     * _note: this will not modify the group reference inside the tween object_
     */
    removeAll(): void;
    /**
     * Adds a tween to this group.
     *
     * _note: this will not modify the group reference inside the tween object_
     * @param tween Tween to add.
     */
    add(tween: Tween<any>): void;
    /**
     * Removes a tween from this group.
     *
     * _note: this will not modify the group reference inside the tween object_
     * @param tween
     */
    remove(tween: Tween<any>): void;
    /**
     * Updates all the tweens in this group.
     *
     * If a tween is stopped, paused, finished or non started it will be removed from the group.
     *
     *  Tweens are updated in "batches". If you add a new tween during an
     *  update, then the new tween will be updated in the next batch.
     *  If you remove a tween during an update, it may or may not be updated.
     *  However, if the removed tween was added during the current batch,
     *  then it will not be updated.
     * @param deltaTime - Amount of **miliseconds** that have passed since last excecution. If not provided it will be calculated using the {@link Group.now} function
     * @param preserve - Prevent the removal of stopped, paused, finished or non started tweens.
     * @returns returns true if the group is not empty and it is not paused.
     */
    update(deltaTime?: number, preserve?: boolean): boolean;
}

export declare interface IDefaultValues {
    safetyCheckFunction: (target: unknown) => boolean;
    easingFunction: EasingFunction;
    yoyoEasingFunction: EasingFunction | undefined;
    interpolationFunction: InterpolationFunction;
}

/**
 * Object containing common interpolation functions.
 * These functions can be passed in the {@link Tween.interpolation} argument and **will only affect fields where you gave an array as target value**
 */
export declare const Interpolation: {
    /**
     * Geometric interpolation functions. Good for interpolating positions in space.
     */
    Geom: {
        /**
         * Linear interpolation is like drawing straight lines between the points.
         */
        Linear(v: number[], k: number): number;
        /**
         * A Bézier curve is defined by a set of control points P0 through Pn, where n is called its order.
         * The first and last control points are always the end points of the curve; however, the intermediate control points (if any) generally do not lie on the curve.
         *
         * https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Explicit_definition
         */
        Bezier(v: number[], k: number): number;
        /**
         * Assumes your points are a succession of quadratic bezier curves where the endpoint of one is the start point of the next one.
         * for example: `[Point in the curve, Control point, Point in the curve, Control point, Point in the curve]`
         */
        QuadraticBezier(v: number[], k: number): number;
        /**
         * Assumes your points are a succession of cubic bezier curves where the endpoint of one is the start point of the next one.
         * for example: `[Point in the curve, Control point, Control point, Point in the curve, Control point, Control point, Point in the curve]`
         */
        CubicBezier(v: number[], k: number): number;
        /**
         * A Catmullrom spline is a curve where the original set of points is also used as control points.
         * Usually Catmullrom splines need two extra elements at the beginning and the end of the point set. This function contemplates that and doesn't need them.
         *
         * https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Catmull%E2%80%93Rom_spline
         */
        CatmullRom(v: number[], k: number): number;
    };
    /**
     * Given the spinny nature of angles, sometimes it's better to go back to get to the right place earlier.
     * This functions help with that.
     */
    Angle: {
        /**
         * Normalizes angles between 0 and 2pi and then rotates the object in the shortest direction.
         */
        Radians(v: number[], k: number): number;
        /**
         * Normalizes angles between 0 and 360 and then rotates the object in the shortest direction.
         */
        Degrees(v: number[], k: number): number;
    };
    /**
     * Even if colors are numbers, interpolating them can be tricky.
     */
    Color: {
        /**
         * Interpolates the color by their channels Red, Green, and Blue.
         */
        RGB(v: number[], k: number): number;
        /**
         * Interpolates the color by their Hue, Saturation, and Value.
         */
        HSV(v: number[], k: number): number;
        /**
         * Interpolates the color by their Hue, Chroma, and Lightness.
         */
        HCL(v: number[], k: number): number;
    };
    /**
     * Helper functions used to calculate the different interpolations
     */
    Utils: {
        RGBsplit(color: number): ARGB;
        HSVsplit(color: number): AHSV;
        HSVJoin(color: AHSV): number;
        HCLSplit(color: number): AHCL;
        HCLJoin(HCL: AHCL): number;
        WrapLinear(value1: number, value2: number, t: number, maxValue: number): number;
        RGBLinear(color1: number, color2: number, t: number): number;
        HSVLinear(color1: number, color2: number, t: number): number;
        HCLLinear(color1: number, color2: number, t: number): number;
        Linear(p0: number, p1: number, t: number): number;
        Bernstein(n: number, i: number): number;
        Factorial: (n: number) => number;
        CatmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number;
    };
};

/**
 * The type for a function that picks a value by interpolating the elements of the array given.
 */
export declare type InterpolationFunction = (v: number[], k: number) => number;

/**
 * Polyfilled function to get the current time in miliseconds.
 * It tries to use `process.hrtime()`, `performance.now()`, `Date.now()` or `new Date().getTime()` in that order.
 */
export declare let NOW: () => number;

/**
 * A recursive version of Typescript's Partial<> decorator.
 */
export declare type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] : RecursivePartial<T[P]>;
};

/**
 * A Tween is basically an animation command.
 * For example: _Go from here to there in this amount of time._
 *
 * Tweens won't start by themselves. **Remeber to call {@link Tween.start} when you want your tweens to start!**
 *
 * Most methods will return the same object to allow for daisy chaining.
 * @template Target of the tween
 */
export declare class Tween<Target> {
    private _isPaused;
    private _valuesStart;
    private _valuesEnd;
    private _valuesStartRepeat;
    private _duration;
    private _repeatCount;
    private _repeat;
    private _repeatDelayTime?;
    private _yoyo;
    private _isPlaying;
    private get _reversed();
    private _delayTime;
    private _startTime;
    private _elapsedTime;
    private _timescale;
    private _overwrite;
    private _safetyCheckFunction;
    private _easingFunction;
    private _yoyoEasingFunction;
    private _interpolationFunction;
    private _chainedTweens;
    private _onStartCallback?;
    private _onStartCallbackFired;
    private _onAfterDelayCallback?;
    private _onAfterDelayCallbackFired;
    private _onUpdateCallback?;
    private _onRepeatCallback?;
    private _onCompleteCallback?;
    private _onStopCallback?;
    private _id;
    private _isChainStopped;
    private _object;
    private _groupRef;
    private get _group();
    private set _group(value);
    /**
     * Creates an instance of tween.
     * @param object - The target object which properties you want to animate
     * @param group - The {@link Group} this new Tween will belong to. If none is provided it will default to the static {@link Group.shared}
     */
    constructor(object: Target, group?: Group);
    /**
     * Gets the id for this tween. A tween id is a number that increases perpetually with each tween created. It is used inside {@link Group} to keep track of tweens
     * @returns returns the id for this tween.
     */
    getId(): number;
    /**
     * Gets {@link Group} that this tween belongs to.
     * @returns returns the {@link Group} for this tween.
     */
    getGroup(): Group;
    /**
     * Gets the timescale for this tween. The timescale is a factor by which each deltatime is multiplied, allowing to speed up or slow down the tween.
     * @returns returns the timescale for this tween.
     */
    getTimescale(): number;
    /**
     * A tween is playing when it has been started but hasn't ended yet. This has nothing to do with pausing. For that see {@link Tween.isPaused}.
     * @returns returns true if this tween is playing.
     */
    isPlaying(): boolean;
    /**
     * A tween can only be paused if it was playing.
     * @returns returns true if this tween is paused.
     */
    isPaused(): boolean;
    /**
     * Writes the starting values of the tween.
     *
     * **Starting values generated from {@link Tween.start} will be overwritten.**
     * @param properties - Starting values for this tween.
     * @returns returns this tween for daisy chaining methods.
     */
    from(properties: RecursivePartial<Target>): this;
    from(properties: any): this;
    /**
     * Set the final values for the target object's properties by copy.
     * This will try to create a deep copy of the `properties` parameter.
     * If you want the tween to keep a reference to the final values use {@link Tween.dynamicTo}.
     *
     * If an array value is provided for a value that originally wasn't an array, it will be interpreted as an interpolable curve and the values inside the array will be interpolated using the function provided in {@link Tween.interpolation}
     *
     * If a string value that starts with either `+` or `-`is provided it will be taken as a _relative value_ to the start value.
     * @param properties - final values for the target object.
     * @param duration - if given it will be used as the duration in **miliseconds**. if not, a call to {@link Tween.duration} will be needed.
     * @returns returns this tween for daisy chaining methods.
     */
    to(properties: RecursivePartial<Target>, duration?: number): this;
    to(properties: any, duration?: number): this;
    /**
     * Set the final values for the target object's properties by reference.
     * This will store a reference to the properties object allowing you to change the final values while the tween is running.
     * If you want the tween to make a copy of the final values use {@link Tween.to}.
     * @param properties - final values for the target object.
     * @param duration - if given it will be used as the duration in **miliseconds**. if not, a call to {@link Tween.duration} will be needed.
     * @returns returns this tween for daisy chaining methods.
     */
    dynamicTo(properties: RecursivePartial<Target>, duration?: number): this;
    dynamicTo(properties: any, duration?: number): this;
    /**
     * Sets the duration for this tween in **miliseconds**.
     * @param d - The duration for this tween in **miliseconds**.
     * @returns returns this tween for daisy chaining methods.
     */
    duration(d: number): this;
    /**
     * Tweens won't start by themselves when created. Call this to start the tween.
     * Starting values for the animation will be stored at this moment.
     *
     * **This function can't overwrite the starting values set by {@link Tween.from}**
     *
     * You can call this method on a finished tween to restart it without changing the starting values.
     * To restart a tween and reset the starting values use {@link Tween.restart}
     * @param delay - if given it will be used as the delay in **miliseconds**.
     * @returns returns this tween for daisy chaining methods.
     */
    start(delay?: number, overwrite?: boolean): this;
    /**
     * @experimental
     * Forces a tween to restart.
     * Starting values for the animation will be stored at this moment.
     * This literally calls {@link Tween.reset} and then {@link Tween.start}.
     *
     * **Starting values will be cleared!. This function will erase all values created from {@link Tween.from} and/or {@link Tween.start}**
     * @param delay - if given it will be used as the delay in **miliseconds**.
     * @returns returns this tween for daisy chaining methods.
     */
    restart(delay?: number): this;
    /**
     * @experimental
     * Clears the starting and loop starting values.
     *
     * **Starting values will be cleared!. This function will erase all values created from {@link Tween.from} and/or {@link Tween.start}**
     * @returns returns this tween for daisy chaining methods.
     */
    reset(): this;
    /**
     * @experimental
     * Stops the tween and sets the values to the starting ones.
     *
     * @returns returns this tween for daisy chaining methods.
     */
    rewind(): this;
    private _setupProperties;
    /**
     * Stops this tween
     * @returns returns this tween for daisy chaining methods.
     */
    stop(): this;
    /**
     * Fastforwards this tween to the end by triggering an update with an infinite value.
     * This will work even on paused tweens.
     * @returns returns this tween for daisy chaining methods.
     */
    end(endChainedTweens?: boolean): this;
    /**
     * @experimental
     * Skips forward the in the repeats of this tween by triggering a biiiiig update.
     * Think of this as a less agressive {@link Tween.end}.
     *
     * @param amount - The amount of repeats to skip.
     * @param resetCurrentLoop - If true, the time will become zero and the object will return to the initial value in the next update.
     * @returns returns this tween for daisy chaining methods.
     */
    skip(amount: number, resetCurrentLoop?: boolean): this;
    /**
     * Pauses this tween. Does nothing is if the tween was already paused or wasn't playing.
     * Paused tweens ignore all update calls.
     * @returns returns this tween for daisy chaining methods.
     */
    pause(): this;
    /**
     * Resumes this tween. Does nothing if the tween wasn't paused nor running.
     * @returns returns this tween for daisy chaining methods.
     */
    resume(): this;
    /**
     * @experimental
     * Stops tweens chained to this tween. To chain a tween see {@link Tween.chain}.
     *
     * @returns returns this tween for daisy chaining methods.
     */
    stopChainedTweens(): this;
    /**
     * @experimental
     * Starts all tweens chained to this tween. To chain a tween see {@link Tween.chain}.
     *
     * @param stopThis - If true, this tween will be stopped before it starts the chained tweens.
     * @returns returns this tween for daisy chaining methods.
     */
    startChainedTweens(stopThis?: boolean): this;
    /**
     * Sets the {@link Group} for this tween.
     * @param group - the group for this tween. If undefined or null is given, the group will default to {@link Group.shared}.
     * @returns returns this tween for daisy chaining methods.
     */
    group(group: Group): this;
    /**
     * Sets the delay for this tween.
     *
     * This will only be applied at the start of the tween. For delaying the repeating of a tween, see {@link Tween.repeatDelay}
     *
     * **This will only work before calling {@link Tween.start}.**
     * @param amount - the delay for this tween.
     * @returns returns this tween for daisy chaining methods.
     */
    delay(amount: number): this;
    /**
     * Sets the timescale for this tween.
     * The deltaTime inside the update will be multiplied by this value allowing to speed up or slow down the flow of time.
     * @param multiplier - the timescale value for this tween.
     * @returns returns this tween for daisy chaining methods.
     */
    timescale(multiplier: number): this;
    /**
     * Sets the number of times this tween will loop
     * @param times - the number of loops. For endless loops use `Infinity`
     * @returns returns this tween for daisy chaining methods.
     */
    repeat(times?: number): this;
    /**
     * Sets the repeat delay for this tween.
     *
     * This will only be applied at the start of every repeat. For delaying only the start, see {@link Tween.delay}
     * @param amount - the repeat delay for this tween.
     * @returns returns this tween for daisy chaining methods.
     */
    repeatDelay(amount: number): this;
    /**
     * Sets if this tween should yoyo (reflect) itself when repeating.
     * @param yoyo - the yoyo value for this tween.
     * @returns returns this tween for daisy chaining methods.
     */
    yoyo(yoyo?: boolean): this;
    /**
     * Sets the easing function to interpolate the starting values with the final values.
     *
     * You can use the functions inside the {@link Easing} object.
     * @param easingFunction - a function that takes a number between 0 and 1 and returns another number between 0 and 1
     * @returns returns this tween for daisy chaining methods.
     */
    easing(easingFunction: EasingFunction): this;
    /**
     * @experimental
     * Sets the safety check function to test if the tweening object is still valid.
     * If the function returns a non-truthy value, the tween will skip the update loop.
     * @param safetyCheckFunction - a function that takes the target object for this tween and returns true if the object is still valid.
     * @returns returns this tween for daisy chaining methods.
     */
    safetyCheck(safetyCheckFunction: (target: Target) => boolean): this;
    /**
     * @experimental
     * Sets the easing function to interpolate the starting values with the final values on the way back due to a yoyo tween.
     *
     * You can use the functions inside the {@link Easing} object.
     * @param easingFunction - a function that takes a number between 0 and 1 and returns another number between 0 and 1
     * @returns returns this tween for daisy chaining methods.
     */
    yoyoEasing(easingFunction: EasingFunction): this;
    /**
     * Sets the easing function to interpolate the starting values with the final values when the final value is an array of objects.
     * Use this to create bezier curves or interpolate colors.
     *
     * You can use the functions inside the {@link Interpolation} object.
     * @param interpolationFunction
     * @returns returns this tween for daisy chaining methods.
     */
    interpolation(interpolationFunction: InterpolationFunction): this;
    /**
     * Adds tweens to be called when this tween ends.
     * The tweens here will be called all at the same time.
     * @param tweens - tweens to be started when this tween ends
     * @returns returns this tween for daisy chaining methods.
     */
    chain(...tweens: Array<Tween<any>>): this;
    /**
     * Sets the onStart callback. This will be called as soon as you call {@link Tween.start}.
     * @param callback - the function to call on start. It will recieve the target object and this tween as a parameter.
     * @returns returns this tween for daisy chaining methods.
     */
    onStart(callback: (object: Target, tween: this) => void): this;
    /**
     * Sets the onAfterDelay callback. This will be called when the delay is over.
     * @param callback - the function to call on start. It will recieve the target object and this tween as a parameter.
     * @returns returns this tween for daisy chaining methods.
     */
    onAfterDelay(callback: (object: Target, tween: this) => void): this;
    /**
     * Sets the onStart callback
     * @param callback - the function to call on start. It will recieve the target object, this tween, and a number between 0 and 1 determining the progress as a parameter.
     * @returns returns this tween for daisy chaining methods.
     */
    onUpdate(callback: (object: Target, elapsed: number, tween: this) => void): this;
    /**
     * Sets the onRepeat callback
     * @param callback - the function to call on repeat. It will recieve the target object and this tween as a parameter.
     * @returns returns this tween for daisy chaining methods.
     */
    onRepeat(callback: (object: Target, repeatCount: number, tweenRef: this) => void): this;
    /**
     * Sets the onComplete callback
     * @param callback - the function to call on complete. It will recieve the target object and this tween as a parameter.
     * @returns returns this tween for daisy chaining methods.
     */
    onComplete(callback: (object: Target, tween: this) => void): this;
    /**
     * Sets the onStop callback
     * @param callback - the function to call on stop. It will recieve the target object and this tween as a parameter.
     * @returns returns this tween for daisy chaining methods.
     */
    onStop(callback: (object: Target, tween: this) => void): this;
    /**
     * Updates this tween
     * @param deltaTime - the amount of time that passed since last update in **miliseconds**
     * @param preserve - Prevent the removal of stopped, paused, finished or non started tweens from their group.
     * @returns returns true if the tween hasn't finished yet.
     */
    update(deltaTime: number, preserve?: boolean): boolean;
    private _internalUpdate;
    private _updateProperties;
    private _handleRelativeValue;
    private _swapEndStartRepeatValues;
    private _moveForwardStartRepeatValues;
}

/**
 * Constant with the hardcoded version of the app
 */
export declare const VERSION = "2.1.0";

export { }
