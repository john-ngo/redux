const { createSlice, configureStore } = require('@reduxjs/toolkit');

// Initial state
const initialState = {
  counter: 0
};

// Create slice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
    decrement: (state) => {
      state.counter -= 1;
    },
    resetCounter: (state) => {
      state.counter = 0;
    },
    incrementBy: (state, action) => {
      state.counter += action.payload;
    }
  }
});

// Generate actions
const { increment, decrement, resetCounter, incrementBy } = counterSlice.actions;

// Generate reducer
const counterReducer = counterSlice.reducer;

// Store
const store = configureStore({
  reducer: counterReducer
});

store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());

store.dispatch(decrement());

store.dispatch(incrementBy(100));

console.log(store.getState());