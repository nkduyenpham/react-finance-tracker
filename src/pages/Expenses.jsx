import React from 'react';
import { Button, DatePicker, Form, Input, Select, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, selectExpenses } from '../redux/finance/financeSlice';

const Expenses = () => {
    // Initialize Ant Design form
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    // Select expenses data from Redux store
    const expenses = useSelector(selectExpenses);

    // Handle form submission
    const handleSubmit = (values) => {
        // Create a new expense object
        const newExpense = {
            id: Date.now(), // Unique id
            name: values.name,
            amount: parseFloat(values.amount), // Convert amount to number
            date: values.date.format('YYYY-MM-DD'), // Format date
            tag: values.tag,
        };
        console.log(newExpense); // Debug: log new expense
        dispatch(addExpense(newExpense)); // Dispatch action to add expense
        form.resetFields(); // Reset form fields
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
