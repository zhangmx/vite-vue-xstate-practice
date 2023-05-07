import { createMachine, forwardTo, interpret } from 'xstate';

function alertService(_, receive) {
  receive((event) => {
    if (event.type === 'ALERT') {
      console.log(event.message);
    }
  });
}

const parentMachine = createMachine({
  id: 'parent',
  invoke: {
    id: 'alerter',
    src: () => alertService
  },
  on: {
    ALERT: { actions: forwardTo('alerter') }
  }
});

const parentService = interpret(parentMachine).start();

parentService.send({ type: 'ALERT', message: 'hello world' });