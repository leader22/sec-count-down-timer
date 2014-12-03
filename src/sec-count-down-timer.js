;(function(global, factory) {
    'use strict';

    var __isAMD      = (typeof global.define === 'function') && global.define.amd;
    var __isCommonJS = (typeof global.exports === 'object') && global.exports;
    var __isNode     = ('process' in global);

    if (__isAMD) {
        define(['exports'], function(exports) {
            return factory(global, exports);
        });
    } else if (__isCommonJS || __isNode) {
        module.exports = factory(global, exports);
    } else {
        global.SecCountDownTimer = factory(global, {});
    }

}(this.self || global, function(global, SecCountDownTimer, undefined) {
    'use strict';

    SecCountDownTimer = function(options) { this.initialize(options); };
    SecCountDownTimer.prototype = {
        constructor: SecCountDownTimer,
        initialize:  _initialize,
        start:       _start,
        pause:       _pause,
        resume:      _resume,
        stop:        _stop,
        _dispose:    _dispose,
        _countDown:  _countDown
    };

    function _initialize(options) {
        options = options || {};
        this.startSec = options.startSec || 60;
        this.onStart  = options.onStart  || __noop;
        this.onCount  = options.onCount  || __noop;
        this.onEnd    = options.onEnd    || __noop;

        this._timer    = null;
        this._lastSec  = this.startSec;
        this._isPaused = 0;

        return this;
    }

    function _start() {
        var that = this;
        this._timer = setInterval(function() {
            that._countDown();
        }, 1000);

        return this;
    }

    function _pause() {
        this._isPaused = 1;

        return this;
    }
    function _resume() {
        this._isPaused = 0;

        return this;
    }
    function _stop() {
        this._dispose();

        return this;
    }
    function _countDown() {
        if (this._isPaused) { return; }
        this._lastSec--;
        this.onCount(this._lastSec);

        if (this._lastSec === 0) {
            this._dispose();
        }
    }

    function _dispose() {
        this.onEnd();
        clearInterval(this._timer);
        this._timer = null;
    }

    return SecCountDownTimer;

    function __noop() {}
}));
