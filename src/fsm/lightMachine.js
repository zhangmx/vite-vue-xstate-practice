
import { createMachine, forwardTo, interpret } from 'xstate';

const lightMachine = createMachine({
    key: 'light',
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
        red: {
            initial: 'walk',
            // 'activateCrosswalkLight' 活动在进入 'light.red' 状态时启动，并在退出时停止。
            activities: ['activateCrosswalkLight'],
            on: {
                TIMER: { target: 'green' }
            },
            states: {
                walk: {
                    on: {
                        PED_WAIT: { target: 'wait' }
                    }
                },
                wait: {
                    // 'blinkCrosswalkLight' 活动在进入 'light.red.wait' 状态时启动，并在退出它或其父状态时停止。
                    activities: ['blinkCrosswalkLight'],
                    on: {
                        PED_STOP: { target: 'stop' }
                    }
                },
                stop: {}
            }
        }
    }
});



const redState = lightMachine.transition('yellow', { type: 'TIMER' });

console.log(redState.activities)
// redState.activities;
// => {
//   activateCrosswalkLight: true
// }
console.log(redState.actions)
// redState.actions;

const redWaitState = lightMachine.transition(redState, { type: 'PED_WAIT' });
console.log(redWaitState.activities)
console.log(redWaitState.actions)

const redStopState = lightMachine.transition(redWaitState, {
    type: 'PED_STOP'
});

console.log("redStopState")

console.log(redStopState.activities)
console.log(redStopState.actions)

const greenState = lightMachine.transition(redStopState, { type: 'TIMER' });

console.log("greenState")

console.log(greenState.activities)
console.log(greenState.actions)

const yellowState = lightMachine.transition(greenState, { type: 'TIMER' });

console.log("yellowState")

console.log(yellowState.activities)
console.log(yellowState.actions)


const redState2 = lightMachine.transition(yellowState, { type: 'TIMER' });
console.log("redState2")
console.log(redState2.activities)
// redState.activities;
// => {
//   activateCrosswalkLight: true
// }
console.log(redState2.actions)