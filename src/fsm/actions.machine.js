import { createMachine, interpret, assign } from 'xstate';


const triggerMachine = createMachine(
    {
        predictableActionArguments: true,
        id: 'trigger',
        initial: 'inactive',
        states: {
            inactive: {
                on: {
                    TRIGGER: {
                        target: 'active',
                        // 转换 actions
                        actions: ['activate', 'sendTelemetry']
                    }
                }
            },
            active: {
                // 进入 actions
                entry: ['notifyActive', 'sendTelemetry'],
                // 退出 actions
                exit: ['notifyInactive', 'sendTelemetry'],
                on: {
                    STOP: { target: 'inactive' }
                }
            }
        }
    },
    {
        actions: {
            // action 实现
            activate: (context, event) => {
                console.log('activating...');
            },
            notifyActive: (context, event) => {
                console.log('active!');
            },
            notifyInactive: (context, event) => {
                console.log('inactive!');
            },
            sendTelemetry: (context, event) => {
                console.log('time:', Date.now());
            }
        }
    }
);

const activeState = triggerMachine.transition('inactive', { type: 'TRIGGER' });

console.log(activeState.actions);