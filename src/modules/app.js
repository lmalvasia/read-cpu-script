import  { exec, spawn } from 'child_process';
import { filter } from 'lodash';
import UTILS from './utils';
import fs from 'fs';

export default class Experiment {
    constructor() {
        this._cpu = {};
        this._activeApps = this._getReadyForRunApps();
        this._run();
    }

    _run() {
        console.log('running', this._activeApps);
        const firstApp = this._activeApps[0];
        console.log('first app', firstApp);
        this._start(firstApp)
            .then(stadout => {
                console.log('Running app:', stadout);
                this._cpu = this._getRunningApp(firstApp.READ_CPU);
                this._listenAndSaveCPUusage();
                setTimeout(() => {
                    this._close(this._activeApps.PACKAGE_NAME);
                }, 10000);
            })
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
            console.error(e);
        }
    }

    _start(app) {
        const command = `adb shell am start -n ${app.PACKAGE_NAME}/${app.ACTIVITY}`;
        console.log('command', command);
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout) => {
                if (error) {
                    reject(new Error('⭕️ Error when starting app. ', error));
                }
                if (stdout) {
                    console.log('stdout', stdout);
                    resolve(stdout);
                }
            });
        })
    }

    _getRunningApp(packageName) {
        console.log('sh', `adb shell top | grep ${packageName}`)
        return spawn('sh', ['-c', `adb shell top | grep ${packageName}`]);
    }

    _listenAndSaveCPUusage() {
        this._cpu.stdout.on('data', data => {
            fs.writeFile(new Date().getTime() + '.log', data, err => {
                if (err) console.log(err)
                console.log('Log created successfully.')
            })
        });
    }

    _close(packageName) {
        return new Promise((reject, resolve) => {
            exec(`adb shell pm clear ${packageName}`, err => {
                if (err) reject(err);
                this._cpu.kill();
                console.log('CPU Socket closed.')
                console.log('App closed successfully.')
            });
        });
    }

}