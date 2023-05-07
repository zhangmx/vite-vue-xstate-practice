import { createMachine, interpret, send, sendParent } from 'xstate';
const pongMachine = createMachine({
    id: 'pong',
    initial: 'active',
    predictableActionArguments: true,
    states: {
        active: {
            on: {
                PING: {
                    // 向父状态机发送“PONG”事件
                    actions: sendParent('PONG', {
                        delay: 1000
                    })
                }
            }
        }
    }
});
// 父状态机
const pingMachine = createMachine({
    predictableActionArguments: true,
    id: 'ping',
    initial: 'active',
    states: {
        active: {
            invoke: {
                id: 'pong',
                src: pongMachine
            },
            // 将“PING”事件发送到 ID 为“pong”的子状态机
            entry: send({ type: 'PING' }, { to: 'pong' }),
            on: {
                PONG: {
                    actions: send({ type: 'PING' }, { to: 'pong', delay: 1000 })
                }
            }
        }
    }
});

// 调用子状态机


const service = interpret(pingMachine).start();