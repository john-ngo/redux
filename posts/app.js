const { createAsyncThunk, createSlice, configureStore } = require('@reduxjs/toolkit');
const axios = require('axios');

const API = 'https://jsonplaceholder.typicode.com/posts';

// Initial state
const initialState = {
  posts: [],
  loading: false,
  error: null
};

// Async Thunk
const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const data = await axios.get(API);
  return data.data;
});

// Slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.posts = [];
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Reducer
const postsReducer = postsSlice.reducer;

// Store
const store = configureStore({
  reducer: postsReducer
});

// Dispatch
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchPosts());