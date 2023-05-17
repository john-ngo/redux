const { createAction, nanoid, createReducer, configureStore } = require('@reduxjs/toolkit');
const logger = require('redux-logger').createLogger();

// Initial state
const initialState = {
  counter: 0
};

// Create action
const increment = createAction('INCREMENT');
const decrement = createAction('DECREMENT');
const resetCounter = createAction('RESET');
const incrementBy = createAction('INCREMENT_BY', (amount) => {
  return {
    payload: {
      id: nanoid(),
      amount
    }
  };
});

// Create reducer
const counterSlice = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state) => {
      state.counter += 1;
    })
    .addCase(decrement, (state) => {
      state.counter -= 1;
    })
    .addCase(resetCounter, (state) => {
      state.counter = 0;
    })
    .addCase(incrementBy, (state, action) => {
      state.counter += action.payload.amount;
    });
});

// const counterSlice2 = createAction(initialState, {
//   [increment]: (state) => {
//     state.counter += 1;
//   },
//   [decrement]: (state) => {
//     state.counter -= 1;
//   },
//   [resetCounter]: (state) => {
//     state.counter = 0;
//   },
//   [incrementBy]: (state, action) => {
//     state.counter += action.payload.amount;
//   }
// });

// Store
const store = configureStore({
  reducer: counterSlice,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

// Dispatch action
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());

store.dispatch(decrement());

store.dispatch(incrementBy(100));

console.log(store.getState());