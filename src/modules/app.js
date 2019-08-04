import  { exec, spawn } from 'child_process';
import { filter } from 'lodash';
import FileService from './fileService';
import UTILS from './utils';

export default class Experiment {
    constructor() {
        this._cpu = {};
        this._currentApp = {};
        this._executionTime = UTILS.getExecutionTime();
        this._activeApps = this._getReadyForRunApps();
        this._runTime = 0;
        this._run();
    }

    _run() {
        const firstApp = this._activeApps[0];
        this._currentApp = firstApp;
        console.log('🔵 CURRENT APP -->', this._currentApp.NAME);
        this._start(firstApp)
            .then(stadout => {
                console.log('✅ App running successfully', stadout);
                this._cpu = this._getRunningApp();
                this._listenAndSaveCPUusage();
                setTimeout(() => {
                    this._closeCPUSocket();
                    this._closeApp();
                }, this._executionTime);
            }).catch(error => {
                console.error('⭕️ ERROR', error);
            });
    }

    _getReadyForRunApps() {
        try {
            if (UTILS.appExists) {
                const androidApps = UTILS.getAndroidApps();
                const iosApps = UTILS.getAndroidApps();
                
                return [
                    ...filter(androidApps, approach => approach.RUN),
                    ...filter(iosApps, approach => approach.RUN),
                ];
            }
        } catch (e) {
            console.error('⭕️ ERROR', e);
        }
    }

    _start(app) {
        return new Promise((resolve, reject) => {
            const command = `adb shell am start -n ${app.PACKAGE_NAME}/${app.ACTIVITY}`;
            console.log('🏃‍♀️ [ADB - Starting app]:', command);
            exec(command, (error, stdout) => {
                console.log('hello world');
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
        const command = `adb shell top | grep ${this._currentApp.READ_CPU}`;
        console.log('🗒  [ADB - Listing processes]:', command);
        return spawn('sh', ['-c', command]);
    }

    _listenAndSaveCPUusage() {
        console.log('👂 [ADB - Listening processes]');
        this._cpu.stdout.on('data', data => {
            console.log('📝 [ADB - Writing outputs]');
            const fileService = new FileService(this._currentApp.NAME, this._runTime.toString());
            fileService._writeFile(data);
        });
    }

    _closeCPUSocket() {
        this._cpu.kill();
    }

    _closeApp() {
        const command = `adb shell pm clear ${this._currentApp.MAIN_PROCESS_NAME}`;
        exec(command, stdout => {
            console.log('✳️  [ADB - App closed.]')
        });
    }

}