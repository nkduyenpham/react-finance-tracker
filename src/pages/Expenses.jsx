import React, { useEffect } from 'react';
import { Button, DatePicker, Form, Input, Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, selectExpenses, setExpenses } from '../redux/finance/financeSlice';  // Corrected import
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { toast } from "react-toastify";

const Expenses = () => {
    const [user] = useAuthState(auth);

    // Initialize Ant Design form
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    // Select expenses data from Redux store
    const expenses = useSelector(selectExpenses);  // Corrected to selectExpenses

    useEffect(() => {
        const fetchExpenses = async () => {
            if (user) {
                const querySnapshot = await getDocs(collection(db, `users/${user.uid}/expense`));
                const expensesData = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                dispatch(setExpenses(expensesData));  // Corrected to setExpenses
            }
        };

        fetchExpenses();
    }, [user, dispatch]);

    // Handle form submission: add expense to Firebase + update the Redux state
    const handleSubmit = async (values) => {
        const newExpense = {
            type: 'expense',
            name: values.name,
            amount: parseFloat(values.amount),
            date: values.date.format('YYYY-MM-DD'),
            tag: values.tag,
        };

        try {
            const docRef = await addDoc(collection(db, `users/${user.uid}/expense`), newExpense);
            newExpense.id = docRef.id; // Set the ID from Firebase
            dispatch(addExpense(newExpense));
            toast.success("Expense Added!");
        } catch (e) {
            console.error("Error adding document: ", e);
            toast.error("Couldn't add Expense");
        }
        form.resetFields();
    };

    // Define columns for the Ant Design Table
    const columns = [
        {
            title: 'Name of Expenses',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount of Expenses',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => `$${text.toFixed(2)}`, // Format amount as currency
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Category',
            dataIndex: 'tag',
            key: 'tag',
        },
    ];

    return (
        <div>
            <h2 className="font-bold text-lg m-10">Manage Your Expenses</h2>
            <div className="flex justify-center items-center p-10">
                <Form
                    form={form}
                    className="border shadow-lg p-6 rounded-lg w-[90%] md:w-[400px] lg:w-[600px]"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        style={{ fontWeight: 600 }}
                        label="Name of Expenses"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the name of the expenses!",
                            },
                        ]}
                    >
                        <Input
                            type="text"
                            className="w-full h-12"
                            style={{ borderWidth: '1px', borderRadius: '4px' }}
                        />
                    </Form.Item>
                    <Form.Item
                        style={{ fontWeight: 600 }}
                        label="Amount of Expenses"
                        name="amount"
                        rules={[
                            {
                                required: true,
                                message: "Please input the amount of expenses!",
                            },
                        ]}
                    >
                        <Input
                            type="number"
                            className="w-full h-12"
                            style={{ borderWidth: '1px', borderRadius: '4px' }}
                        />
                    </Form.Item>
                    <Form.Item
                        style={{ fontWeight: 600 }}
                        label="Date"
                        name="date"
                        rules={[
                            { required: true, message: "Please select the expenses date!" },
                        ]}
                    >
                        <DatePicker
                            format="YYYY-MM-DD"
                            className="w-full h-12 custom-input"
                            style={{ borderWidth: '1px', borderRadius: '4px' }}
                        />
                    </Form.Item>
                    <Form.Item
                        style={{ fontWeight: 600 }}
                        label="Tag"
                        name="tag"
                        rules={[{ required: true, message: "Please select a tag!" }]}
                    >
                        <Select
                            className="w-full h-12 select-input-2"
                            style={{ borderWidth: '1px', borderRadius: '4px' }}
                        >
                            <Select.Option value="food">Food</Select.Option>
                            <Select.Option value="water_electric">Water & Electric</Select.Option>
                            <Select.Option value="education">Education</Select.Option>
                            <Select.Option value="shopping">Shopping</Select.Option>
                            <Select.Option value="transportation">Transportation</Select.Option>
                            <Select.Option value="gift">Gift</Select.Option>
                            <Select.Option value="hangout">Hangout with Friends</Select.Option>
                            <Select.Option value="other">Other</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className="bg-primary border shadow-sm p-4 m-3 rounded-lg cursor-pointer hover:bg-white hover:text-black"
                            htmlType="submit"
                            style={{ width: '100%' }}
                        >
                            Add Expenses
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='border-2 h-[400px] m-10'>
                <Table
                    columns={columns}
                    dataSource={expenses.map(expense => ({ ...expense, key: expense.id }))}
                />
            </div>
        </div>
    );
}

export default Expenses;
