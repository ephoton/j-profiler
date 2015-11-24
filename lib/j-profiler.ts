/**
 * 
 */
;(function() {
	'use strict';
	
	interface SettingsInfo {
		
	}
	
	// interface OptionsInfo {
	// 	repeat: number;
	// }
	
	interface ReportInfo {
		name: string;
		data: number[];
		avarage: number;
		max: number;
		min: number;
		times: number;
	}
	
	enum ProfilerStatus {
		error,
		pause,
		running,
		paused,
		stopped
	}
	
	let root = typeof self == 'object' && self.self === self && self || this;
	
	
	class JProfiler {
		
		
		
		private _report: ReportInfo;
		private	_defaultSettings = {};
		
		private _run(func: () => any): number {
			let startTime = root.performance.now();
			try {
				func();
			}
			catch (error) {
				console.log((<any>func).name + ': error');
				return 0;
			}
			
			return root.performance.now() - startTime;
		}
		
		start: () => {
			
		}
		
		stop (): any  {
			var a = 1;
		}

		test (func: () => any, name?: string, repeat?: number): ReportInfo {
			let repeatTimes = repeat || 1,
				testStatus = true,
				sum = 0,
				report: ReportInfo = {
					name: name || 'anonymous',
					data: [],
					avarage: 0,
					max: 0,
					min: 0,
					times: 0	
				};
			
			for(let index = 0; index < repeatTimes; index ++) {
				let performance = this._run(func);
				if(performance) {
					report.data[index] = performance;
					sum += performance;
					report.avarage = sum / (index + 1);
					report.max < performance ? report.max = performance : null;
					index ? (report.min > performance ? report.min = performance : null) : report.min = performance;
					report.times ++;
				}
			}
			
			return report;	
		}
		
		compare: () => {
			
		}
				
		getReport: () => {
			
		}

		
		
	}
	
	root.jProfiler = JProfiler;
})();