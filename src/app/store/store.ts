import { configureStore } from '@reduxjs/toolkit';
import transactionReducer from './transactionSlice';

// Define the RootState type (the shape of the entire store)
export interface RootState {
  transaction: ReturnType<typeof transactionReducer>;
}

// Configure the Redux store
const store = configureStore({
  reducer: {
    transaction: transactionReducer,
  },
});

// Export the store
export default store;

// Infer the types for dispatch and state
export type AppDispatch = typeof store.dispatch;
export type AppState = RootState;
