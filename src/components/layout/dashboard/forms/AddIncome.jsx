import { Form, Button, DatePicker, Input, Select } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { setIncome } from '../../../../redux/finance/financeSlice';
import { fetchFinanceData } from '../../../../utils/fetchFinanceData.js';

const AddIncome = () => {
    const [user] = useAuthState(auth);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        const newIncome = {
            type: 'income',
            name: values.name,
            amount: parseFloat(values.amount),
            date: values.date.format('YYYY-MM-DD'),
            tag: values.tag,
        };

        try {
            const docRef = await addDoc(collection(db, `users/${user.uid}/income`), newIncome);
            newIncome.id = docRef.id; // Set the ID from Firebase
            dispatch(setIncome(newIncome));
            toast.success("Income Added!");
            await fetchFinanceData(user, dispatch)
        } catch (e) {
            console.error("Error adding document: ", e);
            toast.error("Couldn't add Income");
        }
        form.resetFields();
    }

    return (
        <div>
            <Form
                form={form}
                className=""
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
    )
}

export default AddIncome;
