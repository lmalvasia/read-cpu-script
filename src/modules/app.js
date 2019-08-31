import  { exec, spawn } from 'child_process';
import { filter } from 'lodash';
import FileService from './fileService';
import UTILS from './utils';

export default class Experiment {
    constructor() {
        this._cpu = {};
        this._currentApp = {};
        this._currentRun = 0;
        this._executionTime = UTILS.getExecutionTime();
        this._activeApps = this._getReadyForRunApps();
        this._runTimes = UTILS.getRunTimes();
        this._runApproach();
    }

    async _runApproach() {
        this._activeApps.forEach(async activeApp => {
            this._currentApp = activeApp;
            await this._startRuns();
        });
    }

    async _startRuns() {
        for(let run = 0; run < this._runTimes; run++) {
            console.log('🧹 [DEVICE] -  Cleaning environment (15sec before run).');
            await setTimeout(() => true , 15000);
            console.log('.......................................');
            console.log('☀️  [EXPERIMENT] Starting run | RUN: ', run);
            console.log('.......................................');
            const finishedRunNumber = await this._runExperiment(run);
            console.log('.......................................');
            console.log('✅ [EXPERIMENT] Run Finished | RUN: ', finishedRunNumber);
            console.log('.......................................');
        }
        return true;
    }

    _runExperiment(_runNumber) {
        return new Promise((resolve, reject) => {
            this._currentRun = _runNumber;
            this._openApp(this._currentApp)
                .then(stadout => {
                    console.log('📲 [APP] Running successfully', stadout);
                    this._cpu = this._getRunningApp();
                    this._listenAndSaveCPUusage();
                    // The app will be closed after the executionTime
                    setTimeout(() => {
                        this._closeCPUSocket();
                        this._closeApp();
                        // I added an interval just to do a manual clean up on the device
                        setTimeout(() => {
                            resolve(_runNumber);
                        }, 10000);
                    }, this._executionTime);
                }).catch(error => {
                    reject(error);
                });
        })
    }

    _getReadyForRunApps() {
        try {
            if (UTILS.appExists) {
                const androidApps = UTILS.getAndroidApps();
                const iosApps = UTILS.getiOSApps();

                return [
                    ...filter(androidApps, approach => approach.RUN),
                    ...filter(iosApps, approach => approach.RUN),
                ];
            }
        } catch (e) {
            console.error('⭕️ ERROR', e);
        }
    }

    _openApp(app) {
        return new Promise((resolve, reject) => {
            const command = `adb shell am start -n ${app.PACKAGE_NAME}/${app.ACTIVITY}`;
            console.log('📱 [ADB - Starting app]', command);
            exec(command, (error, stdout) => {
                if (error) {
                    reject('⭕️ Error when starting app:', error);
                }
                if (stdout) {
                    resolve(stdout);
                }
            });
        })
    }

    _getRunningApp() {
        const command = `adb shell top -d 40 | grep ${this._currentApp.READ_CPU}`;
        console.log('🗒  [ADB - Listing processes]', command);
        return spawn('sh', ['-c', command]);
    }

    _listenAndSaveCPUusage() {
        console.log('👂 [ADB - Listening processes]');
        let result = '';
        this._cpu.stdout.on('data', data => {
            console.log('📝 [ADB - Writing outputs]');
            result += data.toString();
        });
        this._cpu.on('close', () => {
            console.log('📝 [ADB - Writing outputs CLOSE]');
            const fileService = new FileService(this._currentApp.NAME, this._currentRun.toString());
            fileService._writeFile(result);
        });
    }

    _closeCPUSocket() {
        this._cpu.kill();
    }

    _closeApp() {
        const command = `adb shell am force-stop ${this._currentApp.MAIN_PROCESS_NAME}`;
        exec(command, () => {
            console.log('🔽 [ADB - App closed.]')
        });
    }

}