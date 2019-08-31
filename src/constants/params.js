const PARAMS = {
    TOP_INTERVAL: 30, // seconds
    EXECUTION_TIME: 50000, // miliseconds, should be TOP_INTERVAL + 20000 miliseconds
    RUN_TIMES: 50,
    APPS: {
        ANDROID: {
            PWA: {
                NAME: 'ANDROID__PWA',
                RUN: false,
                PACKAGE_NAME: "org.chromium.webapk.ab0215b2f3efa021c",
                ACTIVITY: "org.chromium.webapk.shell_apk.MainActivity",
                MAIN_PROCESS_NAME: "com.android.chrome",
                READ_CPU: "com.android.chr+",
            },
            RN: {
                NAME: 'ANDROID__REACT_NATIVE',
                RUN: false,
                PACKAGE_NAME: "com.reactnativeapp",
                ACTIVITY: "com.reactnativeapp.MainActivity",
                MAIN_PROCESS_NAME: "com.reactnativeapp",
                READ_CPU: "com.reactnative+",
            },
            IONIC: {
                NAME: 'ANDROID__IONIC_FRAMEWORK',
                RUN: true,
                PACKAGE_NAME: "io.ionic.starter",
                ACTIVITY: "io.ionic.starter.MainActivity",
                MAIN_PROCESS_NAME: "io.ionic.starter",
                READ_CPU: "-e com.android.chr+ -e io.ionic.starter",
            }
        },
        IOS: {
            PWA: {
                NAME: 'iOS__IONIC_FRAMEWORK',
                RUN: false
            },
            RN: {
                NAME: 'iOS__REACT_NATIVE',
                RUN: false
            },
            IONIC: {
                NAME: 'iOS__IONIC_FRAMEWORK',
                RUN: false
            }
        }
    }
};

export default PARAMS;
