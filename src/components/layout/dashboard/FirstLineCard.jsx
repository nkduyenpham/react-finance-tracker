import React, { useState } from 'react';
import { Card, Row, Modal } from "antd";
import Button from "../../common/Button";
import AddExpense from './forms/AddExpense';
import AddIncome from './forms/AddIncome';

const FirstLineCard = ({ totalIncome, totalExpenses, balance }) => {
    const [isExpenseModalVisible, setExpenseModalVisible] = useState(false);
    const [isIncomeModalVisible, setIncomeModalVisible] = useState(false);

    const showExpenseModal = () => {
        setExpenseModalVisible(true);
    };

    const hideExpenseModal = () => {
        setExpenseModalVisible(false);
    };

    const showIncomeModal = () => {
        setIncomeModalVisible(true);
    };

    const hideIncomeModal = () => {
        setIncomeModalVisible(false);
    };

    return (
        <div className='mx-auto p-4'>
            <Row className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <Card className='md:col-span-2 lg:col-span-1 shadow-lg text-center' title="Current Balance">
                    <h3 className='m-0 text-[40px] p-4 sm:p-6 lg:p-10'>${balance}</h3>
                </Card>
                <Card className="shadow-lg text-center" title="Current Income">
                    <p className='m-0 text-base text-[22px] py-4 sm:py-5 lg:py-5'>${totalIncome}</p>
                    <Button text="Add Income" green={true} onClick={showIncomeModal} />
                </Card>
                <Card className="shadow-lg text-center" title="Current Expense">
                    <p className='m-0 text-base text-[22px] py-4 sm:py-5 lg:py-5'>${totalExpenses}</p>
                    <Button text="Add Expense" green={true} onClick={showExpenseModal} />
                </Card>
            </Row>

            <Modal
                title="Add Income"
                visible={isIncomeModalVisible}
                onCancel={hideIncomeModal}
                footer={null}
            >
                <AddIncome closeModal={hideIncomeModal} />
            </Modal>

            <Modal
                title="Add Expense"
                visible={isExpenseModalVisible}
                onCancel={hideExpenseModal}
                footer={null}
            >
                <AddExpense closeModal={hideExpenseModal} />
            </Modal>
        </div>
    )
}

export default FirstLineCard;
