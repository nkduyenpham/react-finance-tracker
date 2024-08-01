import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectExpenses, selectIncome } from '../redux/finance/financeSlice';
import FirstLineCard from '../components/layout/dashboard/FirstLineCard';
import TransactionTable from '../components/layout/dashboard/TransactionTable';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Charts from '../components/layout/dashboard/Charts';
import NoTransactions from '../components/layout/dashboard/NoTransaction';
import { fetchFinanceData } from '../utils/fetchFinanceData.js';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();
    const expenses = useSelector(selectExpenses);
    const income = useSelector(selectIncome);
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

    const fetchData = useCallback(() => {
        fetchFinanceData(user, dispatch);
    }, [user, dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const filterByMonth = (data, month) => {
        if (!Array.isArray(data)) {
            console.error("Expected data to be an array, but got:", data);
            return [];
        }
        return data.filter(item => item.date.startsWith(month));
    };

    const filteredExpenses = filterByMonth(expenses, selectedMonth);
    const filteredIncome = filterByMonth(income, selectedMonth);

    const calculateTotal = (data) => data.reduce((acc, item) => acc + item.amount, 0);

    const filteredTotalIncome = calculateTotal(filteredIncome);
    const filteredTotalExpenses = calculateTotal(filteredExpenses);
    const filteredBalance = filteredTotalIncome - filteredTotalExpenses;

    const mergedData = [
        ...filteredIncome.map(item => ({ ...item, type: 'Income' })),
        ...filteredExpenses.map(item => ({ ...item, type: 'Expense' }))
    ];

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <div>
            <div className="flex justify-end items-center px-10 py-3 mr-3">
                <input
                    type="month"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="border rounded-lg shadow-sm p-3"
                />
            </div>
            <FirstLineCard
                totalIncome={filteredTotalIncome}
                totalExpenses={filteredTotalExpenses}
                balance={filteredBalance}
            />
            {filteredExpenses.length > 0 || filteredIncome.length > 0 ? (
                <Charts expenses={filteredExpenses} income={filteredIncome} />
            ) : (
                <NoTransactions />
            )}
            <h3 className='text-[20px] font-bold'>ALL TRANSACTIONS</h3>
            <TransactionTable mergedData={mergedData} />
        </div>
    );
};

export default Dashboard;
