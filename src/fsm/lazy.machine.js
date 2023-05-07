import { createMachine, send } from 'xstate';




const lazyStubbornMachine = createMachine({
    predictableActionArguments: true,
    id: 'stubborn',
    initial: 'inactive',
    states: {
      inactive: {
        on: {
          TOGGLE: {
            target: 'active',
            // 再次向服务发送 TOGGLE 事件
            actions: send('TOGGLE')
          }
        }
      },
      active: {
        on: {
          TOGGLE: { target: 'inactive' }
        }
      }
    }
  });
  
  const nextState = lazyStubbornMachine.transition('inactive', {
    type: 'TOGGLE'
  });
  

  nextState.value;
  // => 'active'
  nextState.actions;
  console.log(nextState.actions);
  console.log(nextState.value);