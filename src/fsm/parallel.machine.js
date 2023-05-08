import { createMachine, interpret, assign } from 'xstate';


const fileMachine = createMachine({
    predictableActionArguments: true,
    id: 'file',
    type: 'parallel',
    states: {
        upload: {
            initial: 'idle',
            states: {
                idle: {
                    on: {
                        INIT_UPLOAD: { target: 'pending' }
                    }
                },
                pending: {
                    on: {
                        UPLOAD_COMPLETE: { target: 'success' }
                    }
                },
                success: {}
            }
        },
        download: {
            initial: 'idle',
            states: {
                idle: {
                    on: {
                        INIT_DOWNLOAD: { target: 'pending' }
                    }
                },
                pending: {
                    on: {
                        DOWNLOAD_COMPLETE: { target: 'success' }
                    }
                },
                success: {}
            }
        }
    }
});

console.log(fileMachine.initialState.value);

console.log(
    fileMachine.transition(
        {
            upload: 'pending',
            download: 'idle'
        },
        { type: 'UPLOAD_COMPLETE' }
    ).value
);
const lightMachine = createMachine({
    // 不是并行状态机
    predictableActionArguments: true,
    id: 'light',
    initial: 'green',
    states: {
        green: {
            on: {
                TIMER: { target: 'yellow' }
            }
        },
        yellow: {
            on: {
                TIMER: { target: 'red' }
            }
        },

        // 嵌套并行状态机
        red: {
            type: 'parallel',
            states: {
                walkSign: {
                    initial: 'solid',
                    states: {
                        solid: {
                            on: {
                                COUNTDOWN: { target: 'flashing' }
                            }
                        },
                        flashing: {
                            on: {
                                STOP_COUNTDOWN: { target: 'solid' }
                            }
                        }
                    }
                },
                pedestrian: {
                    initial: 'walk',
                    states: {
                        walk: {
                            on: {
                                COUNTDOWN: { target: 'wait' }
                            }
                        },
                        wait: {
                            on: {
                                STOP_COUNTDOWN: { target: 'stop' }
                            }
                        },
                        stop: {
                            type: 'final'
                        }
                    }
                }
            }
        }
    }
});

console.log(lightMachine.transition('yellow', { type: 'TIMER' }).value);