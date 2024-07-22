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
        setExpenses: (state, action) => {
            state.expenses = action.payload;  // Corrected to state.expenses
        },
        setIncome: (state, action) => {
            state.income = action.payload;
        }
        // Reducers for editing and deleting here
    },
});

// Export actions
export const { addIncome, addExpense, setExpenses, setIncome } = financeSlice.actions;  // Corrected to setExpenses

// Export selectors
export const selectExpenses = (state) => state.finance.expenses;  // Corrected to selectExpenses
export const selectIncome = (state) => state.finance.income;

// Selectors to calculate totals and balance
export const selectTotalIncome = (state) =>
    state.finance.income.reduce((total, item) => total + item.amount, 0);

export const selectTotalExpenses = (state) =>
    state.finance.expenses.reduce((total, item) => total + item.amount, 0);

export const selectBalance = (state) =>
    selectTotalIncome(state) - selectTotalExpenses(state);

// Export reducer
export default financeSlice.reducer;
