import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import {setExpenses, setIncome} from '../redux/finance/financeSlice';

export const fetchFinanceData = async (user, dispatch) => {
    try {
        if (user) {
            const [expenseSnapshot, incomeSnapshot] = await Promise.all([
                getDocs(collection(db, `users/${user.uid}/expense`)),
                getDocs(collection(db, `users/${user.uid}/income`))
            ]);

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
    } catch (error) {
        console.error("Error fetching finance data:", error);
    }
};
