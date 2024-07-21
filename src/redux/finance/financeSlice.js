import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    income: [],
    expenses: [],
};

const financeSlice = createSlice({ 
    name: 'finance',
    initialState,
    reducers: {
        addIncome: (state, action) => {
            state.income.push(action.payload);
        },
        addExpense: (state, action) => {
            state.expenses.push(action.payload);
        },
        // Reducers for editing and deleting here
    },
});

// Export actions
export const { addIncome, addExpense } = financeSlice.actions;

// Export selectors
export const selectExpenses = (state) => state.finance.expenses;
export const selectIncome = (state) => state.finance.income;

// Export reducer
export default financeSlice.reducer;
