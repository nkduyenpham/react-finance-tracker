import React, { useEffect } from 'react';
import { Button, DatePicker, Form, Input, Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addIncome, selectIncome, setIncome } from '../redux/finance/financeSlice';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { toast } from "react-toastify";


const Income = () => {
    const [user] = useAuthState(auth);

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const incomes = useSelector(selectIncome);

    useEffect(() => {
        const fetchIncome = async () => {
            if (user) {
                const querySnapshot = await getDocs(collection(db, `users/${user.uid}/income`));
                const incomeData = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                dispatch(setIncome(incomeData));
                console.log(incomeData)
            }
        };

        fetchIncome();
    }, [user, dispatch]);

    const handleSubmit = async (values) => {
        const newIncome = {
            type: 'income',
            id: new Date(),
            name: values.name,
            amount: parseFloat(values.amount),
            date: values.date.format('YYYY-MM-DD'),
            tag: values.tag,
        };
        try {
            const docRef = await addDoc(collection(db, `users/${user.uid}/income`), newIncome);
            newIncome.id = docRef.id; // Set the ID from Firebase
            dispatch(addIncome(newIncome));
            toast.success("Income Added!");
        } catch (e) {
            console.error("Error adding document: ", e);
            toast.error("Couldn't add Income");
        }
        form.resetFields();
    }

    // Define columns for the Ant Design Table
    const columns = [
        {
            title: 'Name of Income',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount of Income',
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
            <h2 className='font-bold text-lg m-10'>Manage Your Income</h2>
            <div className="flex justify-center items-center p-10">
                <Form
                    form={form}
                    className="border shadow-lg p-6 rounded-lg w-[90%] md:w-[400px] lg:w-[600px]"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        style={{ fontWeight: 600 }}
                        label="Name of income"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the name of the transaction!"
                            }
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
                        label="Amount of income"
                        name="amount"
                        rules={[
                            {
                                required: true,
                                message: "Please input the amount of income!"
                            }
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
                            { required: true, message: "Please select the income date!" },
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
                            <Select.Option value="salary">Salary</Select.Option>
                            <Select.Option value="freelance">Freelance</Select.Option>
                            <Select.Option value="investment">Investment</Select.Option>
                            <Select.Option value="investment">Other</Select.Option>
                            {/* Add more tags here */}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className="bg-primary border shadow-sm p-4 m-3 rounded-lg cursor-pointer hover:bg-white hover:text-black"
                            htmlType="submit"
                            style={{ width: '100%' }}
                        >
                            Add Income
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='border-2 h-[400px] m-10'>
                <Table
                    columns={columns}
                    dataSource={incomes.map(income => ({ ...income, key: income.id }))}
                />            </div>
        </div>
    )
}

export default Income