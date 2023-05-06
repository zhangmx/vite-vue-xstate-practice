import { createMachine, interpret,assign } from 'xstate';

const pedestrianStates = {
    initial: 'walk',
    states: {
        walk: {
            on: {
                PED_COUNTDOWN: { target: 'wait' }
            }
        },
        wait: {
            on: {
                PED_COUNTDOWN: { target: 'stop' }
            }
        },
        stop: {},
        blinking: {}
    }
};

const lightMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAYgAUB5AdQFEAlAfQoFUAVAQQHEaBtABgC6iUAAcA9rFwAXXGPzCQAD0QAWAEwAaEAE9EADgCMAOgCsfc3wBsekwGYzJkwYC+zrWix5CpSrUZ0aAGVWCgCAEX4hJBBxSRk5BWUEAHYATiM1FVSHA0sVS1tUtUstXQQ1AxMjFWSDCr5k2r5Ug3VXdwwcAmIjKAAnMDB8ElYASQBZekiFWOlZeWiklRNLIz0+FYNkvjVmlQ3bUsR7NWrcvJqTGr1DdpAPLu8jbTAAG1exAHcRianBGYkcwSi0QBj4tmMeT0qQa6ly4KO5T0p0almKJjUu2yyzuDy8PQGEB+kzo02is3iC1ASWhVVSehq5gMqWWlksBkRuz0RjS7OKKhuG1SjVxnXxRCMhKMn3QrwA1uQaGEGABhFgAOVYYWo6rJokBlMS+gaPOaRXy4OShj0iPsRhZrTs2TZtmS7Msos83QlUpl0kVyrVzE12qouv+5IN8yNCAMBghRkKyRqaNsalSLOStrpKkdhRWBTduVcbhA+DEEDgCjx3oBcWjIIQAFoSjpEE34+kNjZHHxlssk57Hj1+oMqTEo8DqYhk5D1Dctlc+9ZOSt7Xo3Qdcg42UPxc83h9PnWgeOabtTMlCjC0rnLDtbeojJYM-m9Gi4VY997JZAT4bG0LU0MzqcE6nUQ422bJxTBMHs1HsWwGXUNRvyeX1ZTlf8G2nBBrCqbYQN2CFMgQ21VhUXNKOycw4NyPQ0IJSBpXQaRsKnJRQXMdIk3yWw2T7RwVHI6oqIhSw3XsRoGNLGt0OY2ApDEER2LPUFbA0ow+BsPhKjUaE2RsETKNacTJJMaTGJ9ZiACNXgIOUCCgVSY3w4CWmI8CyKgll7SojE0yQq00hLZwgA */
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
            on: {
                TIMER: { target: 'green' }
            },
            ...pedestrianStates
        }
    },
    on: {
        POWER_OUTAGE: { target: '.red.blinking' },
        POWER_RESTORED: { target: '.red' }
    }
});