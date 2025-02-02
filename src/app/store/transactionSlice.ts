import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state type
interface TransactionState {
  data: string | Date | null;
  description: string | null;
  type: string | null;
  value: number | null;
  file: string | null;
}

// Define the initial state with the correct type
const initialState: TransactionState = {
  data: null,
  description: null,
  type: null,
  value: null,
  file: null,
};

// Define the slice
const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransaction: (
      state,
      action: PayloadAction<{
        data: string | Date | null;
        description: string | null;
        type: string | null;
        value: number | null;
        file: string | null;
      }>
    ) => {
      state.data = action.payload.data;
      state.description = action.payload.description;
      state.type = action.payload.type;
      state.value = action.payload.value;
      state.file = action.payload.file;
    },

    updateTransaction: (
        state,
        action: PayloadAction<{
          data: string | Date | null;
          description: string | null;
          type: string | null;
          value: number | null;
          file: string | null;
        }>
      ) => {

        if (action.payload.data !== null) {
          state.data = action.payload.data;
        }
        if (action.payload.description !== null) {
          state.description = action.payload.description;
        }
        if (action.payload.type !== null) {
          state.type = action.payload.type;
        }
        if (action.payload.value !== null) {
          state.value = action.payload.value;
        }
        if (action.payload.file !== null) {
          state.file = action.payload.file;
        }
      },
  },
});

// Export the actions
export const { setTransaction, updateTransaction } = transactionSlice.actions;

// Export the reducer
export default transactionSlice.reducer;
