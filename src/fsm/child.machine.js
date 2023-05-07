
import { createMachine, assign, interpret } from 'xstate';



const secretMachine = createMachine({
    id: 'secret',
    initial: 'wait',
    context: {
        secret: '42'
    },
    states: {
        wait: {
            after: {
                1000: { target: 'reveal' }
            }
        },
        reveal: {
            type: 'final',
            data: {
                secret: (context, event) => context.secret
            }
        }
    }
});

const parentMachine = createMachine({
    id: 'parent',
    initial: 'pending',
    context: {
        revealedSecret: undefined
    },
    states: {
        pending: {
            invoke: {
                id: 'secret',
                src: secretMachine,
                onDone: {
                    target: 'success',
                    actions: assign({
                        revealedSecret: (context, event) => {
                            // event is:
                            // { type: 'done.invoke.secret', data: { secret: '42' } }
                            return event.data.secret;
                        }
                    })
                }
            }
        },
        success: {
            type: 'final'
        }
    }
});

const service = interpret(parentMachine)
    .onTransition((state) => console.log(state.context))
    .start();