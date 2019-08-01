const PARAMS = {
    EXECUTION_TIME: 10,
    RUN_TIMES: 100,
    APPS: {
        ANDROID: {
            PWA: {
                NAME: '🤖 [ANDROID] -- PWA',
                RUN: true,
                PACKAGE_NAME: "com.android.chrome",
                READ_CPU: "com.android.chr",
                ACTIVITY: "MainActivity"
            },
            RN: {
                NAME: '🤖 [ANDROID] -- REACT NATIVE',
                RUN: false,
                PACKAGE_NAME: "com.progressivewebapp",
                READ_CPU: "com.progressivewebapp",
                ACTIVITY: "com.progressivewebapp.MainActivity"
            },
            IONIC: {
                NAME: '🤖 [ANDROID] -- IONIC FRAMEWORK',
                RUN: false
            }
        },
        IOS: {
            PWA: {
                NAME: '📱 [iOS] -- IONIC FRAMEWORK',
                RUN: false
            },
            RN: {
                NAME: '📱 [iOS] -- REACT NATIVE',
                RUN: false
            },
            IONIC: {
                NAME: '📱 [iOS] -- IONIC FRAMEWORK',
                RUN: false
            }
        }
    }
};

export default PARAMS;