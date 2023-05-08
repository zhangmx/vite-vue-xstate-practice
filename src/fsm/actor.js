import xstate from 'xstate';
const { createActor } = xstate;

const lightActor = createActor({
    initial: 'green',
    states: {
        green: {
            on: { TIMER: 'yellow' }
        },
        yellow: {
            on: { TIMER: 'red' }
        },
        red: {
            on: { TIMER: 'green' }
        }
    }
});