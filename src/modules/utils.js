import PARAMS from '../constants/params';

export default class Utils {
    static getExecutionTime() {
        if (!PARAMS.EXECUTION_TIME) {
            throw new Error('⭕️ EXECUTION_TIME is not defined.');
        }

        if (typeof PARAMS.EXECUTION_TIME !== 'number') {
            throw new Error('⭕️ EXECUTION_TIME is not a number.');
        }

        return PARAMS.EXECUTION_TIME;
    }

    static getTopInterval() {
        if (!PARAMS.TOP_INTERVAL) {
            throw new Error('⭕️ TOP_INTERVAL is not defined.');
        }

        if (typeof PARAMS.TOP_INTERVAL !== 'number') {
            throw new Error('⭕️ TOP_INTERVAL is not a number.');
        }

        return PARAMS.TOP_INTERVAL;
    }

    static getRunTimes() {
        if (!PARAMS.RUN_TIMES) {
            throw new Error('⭕️ RUN_TIMES is not defined.');
        }

        if (typeof PARAMS.RUN_TIMES !== 'number') {
            throw new Error('⭕️ RUN_TIMES is not a number.');
        }

        return PARAMS.RUN_TIMES;
    }

    static getAndroidApps() {
        if (!PARAMS.APPS.ANDROID) {
            throw new Error('⭕️ APPS.ANDROID is undefined.');
        }

        if (typeof PARAMS.APPS.ANDROID !== 'object') {
            throw new Error('⭕️ APPS.ANDROID is not an object.');
        }

        return PARAMS.APPS.ANDROID;
    }

    static getiOSApps() {
        if (!PARAMS.APPS.IOS) {
            throw new Error('⭕️ APPS.IOS is undefined.');
        }

        if (typeof PARAMS.APPS.IOS !== 'object') {
            throw new Error('⭕️ APPS.IOS is not an object.');
        }

        return PARAMS.APPS.IOS;
    }

    static appExists() {
        if (!PARAMS.APPS) {
            throw new Error('⭕️ APPS is undefined.');
        }

        if (typeof PARAMS.APPS !== 'object') {
            throw new Error('⭕️ APPS is not an object.');
        }

        return true;
    }
}