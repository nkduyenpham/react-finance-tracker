import React, { useEffect, useState } from 'react'
// import { Row } from "antd"
// import Button from '../components/common/Button'
// import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setExpenses, setIncome, selectExpenses, selectIncome } from '../redux/finance/financeSlice';
import FirstLineCard from '../components/layout/dashboard/FirstLineCard';
import TransactionTable from '../components/layout/dashboard/TransactionTable';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs } from 'firebase/firestore';
import Charts from '../components/layout/dashboard/Charts';
import NoTransactions from '../components/layout/dashboard/NoTransaction';
const Dashboard = () => {
    const [user] = useAuthState(auth);
    const dispatch = useDispatch();
    // state for month filter
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // Default to current month
    const expenses = useSelector(selectExpenses);
    const income = useSelector(selectIncome);
    // const totalIncome = useSelector(selectTotalIncome);
    // const totalExpenses = useSelector(selectTotalExpenses);
    // const balance = useSelector(selectBalance);

    useEffect(() => {
        const fetchFinanceData = async () => {
            if (user) {
                const expenseSnapshot = await getDocs(collection(db, `users/${user.uid}/expense`));
                const incomeSnapshot = await getDocs(collection(db, `users/${user.uid}/income`));
                const expensesData = expenseSnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                const incomeData = incomeSnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                dispatch(setExpenses(expensesData));
                dispatch(setIncome(incomeData));
            }
        };
        fetchFinanceData();
    }, [user, dispatch]);
    // Function to filter data by selected month
    const filterByMonth = (data, month) => {
        return data.filter(item => item.date.startsWith(month));
    };
    const filteredExpenses = filterByMonth(expenses, selectedMonth);
    const filteredIncome = filterByMonth(income, selectedMonth);
    const calculateTotal = (data) => {
        return data.reduce((acc, item) => acc + item.amount, 0);
    };
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
                {/* <Button onClick={() => setSelectedMonth(new Date().toISOString().slice(0, 7))}>
                    Filter by Current Month
                </Button> */}
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
            {filteredExpenses.length !== 0 || filteredIncome.length !== 0 ? (
                <Charts expenses={filteredExpenses} income={filteredIncome} />
            ) : (
                <NoTransactions />
            )}
            <h3 className='text-[20px] font-bold'>ALL TRANSACTIONS</h3>
            <TransactionTable mergedData={mergedData} />
        </div>
    )
}
export default Dashboard 