const PARAMS = {
    EXECUTION_TIME: 10000, // miliseconds
    RUN_TIMES: 100,
    APPS: {
        ANDROID: {
            PWA: {
                NAME: 'ANDROID__PWA',
                RUN: true,
                PACKAGE_NAME: "org.chromium.webapk.ab0215b2f3efa021c",
                ACTIVITY: "org.chromium.webapk.shell_apk.MainActivity",
                MAIN_PROCESS_NAME: "com.android.chrome",
                CHILD_PROCESS_NAME: "sandboxed_process1",
                READ_CPU: "com.android.chr+",
            },
            RN: {
                NAME: 'ANDROID__REACT_NATIVE',
                RUN: false,
                PACKAGE_NAME: "com.progressivewebapp",
                ACTIVITY: "com.progressivewebapp.MainActivity",
                PROCESS_NAME: "",
                READ_CPU: "",
            },
            IONIC: {
                NAME: 'ANDROID__IONIC_FRAMEWORK',
                RUN: false,
                PACKAGE_NAME: "",
                ACTIVITY: "",
                PROCESS_NAME: "",
                READ_CPU: "",
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