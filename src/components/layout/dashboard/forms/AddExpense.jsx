import { Form, Button, DatePicker, Input, Select } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { setExpenses } from '../../../../redux/finance/financeSlice';
import { fetchFinanceData } from '../../../../utils/fetchFinanceData.js';

const AddExpense = () => {
    const [user] = useAuthState(auth);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

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
            dispatch(setExpenses(newExpense));
            toast.success("Expense Added!");
            await fetchFinanceData(user, dispatch)
        } catch (e) {
            console.error("Error adding document: ", e);
            toast.error("Couldn't add Expense");
        }
        form.resetFields();
    };

    return (
        <div>
            <Form
                form={form}
                className="p-6"
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
                        {
                            max: 50,
                            message: "Name should not exceed 50 characters!",
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
                        // {
                        //     validator: (_, value) =>
                        //         value && value.isAfter('2000-01-01') && value.isBefore('2100-01-01')
                        //             ? Promise.resolve()
                        //             : Promise.reject("Please select a valid date!"),
                        // },
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
    );
};

export default AddExpense;
