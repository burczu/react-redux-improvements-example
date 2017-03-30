import React, { PropTypes } from 'react';
import { Record } from 'immutable';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

const InitialState = Record({ counter: 0 });
const initialState = new InitialState;

const revive = (data) => initialState.merge({ counter: data.counter });

const reducer = (state, action) => {
  if (!(state instanceof InitialState)) {
    return revive(state);
  }

  switch (action.type) {
    case 'INCREMENT':
      return state.set('counter', state.get('counter') + 1);
    case 'DECREMENT':
      return state.set('counter', state.get('counter') - 1);
    default:
      return state;
    }
};

const store = createStore(reducer, initialState);

class Counter extends React.Component {
  static propTypes = {
    counter: PropTypes.number,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func
  };

  render() {
    const { counter, onDecrement, onIncrement } = this.props;

    return (
      <div>
        <div>{counter}</div>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state.toObject() };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => dispatch({ type: 'INCREMENT' }),
    onDecrement: () => dispatch({ type: 'DECREMENT' })
  }
};

Counter = connect(mapStateToProps, mapDispatchToProps)(Counter);

render(
  <Provider store={store}>
    <Counter />
  </Provider>
  , document.getElementById('root')
);