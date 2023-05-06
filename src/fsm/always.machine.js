import { createMachine, interpret } from 'xstate';

const isAdult = ({ age }) => age >= 18;
const isMinor = ({ age }) => age < 18;

const ageMachine = createMachine({
  predictableActionArguments: true,
  id: 'age',
  context: { age: undefined }, // age 不知道
  initial: 'unknown',
  states: {
    unknown: {
      always: [
        { target: 'adult', cond: isAdult },
        { target: 'child', cond: isMinor }
      ],

      on: {
        // 当满足 cond 条件时，立即 转换。 否则，不会发生 转换
        // always: [
        //   { target: 'adult', cond: isAdult },
        //   { target: 'child', cond: isMinor }
        // ]
      }
    },
    adult: { type: 'final' },
    child: { type: 'final' }
  }
});

console.log(ageMachine.initialState.value);
// => 'unknown'

const personData = { age: 8 };

const personMachine = ageMachine.withContext(personData);

console.log(personMachine.initialState.value);