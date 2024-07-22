import React, { useEffect } from 'react'
import { Card, Row } from "antd"
import Button from '../components/common/Button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setExpenses, setIncome, selectExpenses, selectIncome, selectTotalIncome, selectTotalExpenses, selectBalance } from '../redux/finance/financeSlice';
import FirstLineCard from '../components/layout/dashboard/FirstLineCard';
import TransactionTable from '../components/layout/dashboard/TransactionTable';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs } from 'firebase/firestore';


const Dashboard = () => {
    const [user] = useAuthState(auth);

    const dispatch = useDispatch();

    const expenses = useSelector(selectExpenses);
    const income = useSelector(selectIncome);
    const totalIncome = useSelector(selectTotalIncome);
    const totalExpenses = useSelector(selectTotalExpenses);
    const balance = useSelector(selectBalance);

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

    const mergedData = [
        ...income.map(item => ({ ...item, type: 'Income' })),
        ...expenses.map(item => ({ ...item, type: 'Expense' }))
    ];

    return (
        <div>
            <FirstLineCard
                totalIncome={totalIncome}
                totalExpenses={totalExpenses}
                balance={balance}
            />
            <h3 className='text-[20px] font-bold'>All Transactions</h3>
            <TransactionTable
                mergedData={mergedData}
            />
        </div>
    )
}

export default Dashboard 