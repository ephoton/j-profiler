;
(function () {
    'use strict';
    var ProfilerStatus;
    (function (ProfilerStatus) {
        ProfilerStatus[ProfilerStatus["error"] = 0] = "error";
        ProfilerStatus[ProfilerStatus["pause"] = 1] = "pause";
        ProfilerStatus[ProfilerStatus["running"] = 2] = "running";
        ProfilerStatus[ProfilerStatus["paused"] = 3] = "paused";
        ProfilerStatus[ProfilerStatus["stopped"] = 4] = "stopped";
    })(ProfilerStatus || (ProfilerStatus = {}));
    var root = typeof self == 'object' && self.self === self && self || this;
    var JProfiler = (function () {
        function JProfiler() {
            this._defaultSettings = {};
        }
        JProfiler.prototype._run = function (func) {
            var startTime = root.performance.now();
            try {
                func();
            }
            catch (error) {
                console.log(func.name + ': error');
                return 0;
            }
            return root.performance.now() - startTime;
        };
        JProfiler.prototype.stop = function () {
            var a = 1;
        };
        JProfiler.prototype.test = function (func, name, repeat) {
            var repeatTimes = repeat || 1, testStatus = true, sum = 0, report = {
                name: name || 'anonymous',
                data: [],
                avarage: 0,
                max: 0,
                min: 0,
                times: 0
            };
            for (var index = 0; index < repeatTimes; index++) {
                var performance_1 = this._run(func);
                if (performance_1) {
                    report.data[index] = performance_1;
                    sum += performance_1;
                    report.avarage = sum / (index + 1);
                    report.max < performance_1 ? report.max = performance_1 : null;
                    index ? (report.min > performance_1 ? report.min = performance_1 : null) : report.min = performance_1;
                    report.times++;
                }
            }
            return report;
        };
        return JProfiler;
    })();
    root.jProfiler = JProfiler;
})();
//# sourceMappingURL=j-profiler.js.map