import { createMachine, interpret } from 'xstate';

const promiseMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAcBOB7AtgS1mAdMmAHYTbFQDEASgKIDKA8gDIBqtA2gAwC6iK6WNgAu2dMX4gAHogCMANgAsAGhABPRAA4ATPm0BWAL6HVaLLgJFS5KnQBStAMIAVbnyQhkgkWIkeZCAoq6nKKAMx6RsaqxOgQcJJmOHiJ3qLikgEAtPKqGgg50Z4YyZYkZBSpQul+oAGK2nlaAJz4CvIdnV3yAOxFSRb4qHDoADYAbpBVPhn+iNrNivj6PZqyBk0Ia8v9JYPDAFZgAMbCUx5e1b6Z84vLq+v6m7INO8aGQA */
    id: 'promise',
    predictableActionArguments: true,
    initial: 'pending',
    states: {
        pending: {
            on: {
                RESOLVE: { target: 'resolved' },
                REJECT: { target: 'rejected' }
            }
        },
        resolved: {
            type: "final"
        },
        rejected: {
            type: 'final'
        }
    }
});

export default interpret(promiseMachine)
export { promiseMachine }

// promiseService.onTransition((state) => console.log(state.value))
//     .start();

// promiseService.send('RESOLVE');
