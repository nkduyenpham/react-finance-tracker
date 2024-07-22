import React from 'react'
import { Card, Row } from "antd"
import Button from "../../common/Button"
import { Link } from 'react-router-dom'

const FirstLineCard = ({ totalIncome, totalExpenses, balance }) => {
    return (
        <div>
            <Row className='flex justify-between items-center m-10'>
                <Card className="shadow-lg min-w-[500px] h-[250px] p-1 text-center m-2" title="Current Balance">
                    <h3 className='m-0 text-[40px] p-10'>${balance}</h3>
                </Card>
                <Card className="shadow-lg min-w-[500px] h-[250px] p-1 text-center m-2" title="Current Income">
                    <p className='m-0 text-[20px] py-5'>${totalIncome}</p>
                    <Link to="/income"><Button text="Add Income" green={true} /></Link>
                </Card>
                <Card className="shadow-lg min-w-[500px] h-[250px] p-1 text-center m-2" title="Current Expense">
                    <p className='m-0 text-[20px] py-5'>${totalExpenses}</p>
                    <Link to="/expenses"><Button text="Add Expense" green={true} /></Link>
                </Card>
            </Row>
        </div>
    )
}

export default FirstLineCard