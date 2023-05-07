
import { createMachine, forwardTo, interpret } from 'xstate';


const toggleMachine = createMachine(
    {
        id: 'toggle',
        initial: 'inactive',
        states: {
            inactive: {
                on: {
                    TOGGLE: { target: 'active' }
                }
            },
            active: {
                // 只要状态机处于 'active' 状态， 'beeping' 活动就会发生
                activities: ['beeping'],
                on: {
                    TOGGLE: { target: 'inactive' }
                }
            }
        }
    },
    {
        activities: {
            beeping: () => {
                // 开始 beeping activity
                const interval = setInterval(() => console.log('BEEP!'), 1000);
                console.log('beeping')
                // 返回一个函数，用于停止 beeping activity
                return () => clearInterval(interval);
            }
        }
    }
);



const toggleService = interpret(toggleMachine).start();

toggleService.send('TOGGLE');
// toggleService.send('TOGGLE');
