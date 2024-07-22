import React from 'react'
import { Card, Row } from "antd"
import Button from "../../common/Button"
import { Link } from 'react-router-dom'

const FirstLineCard = ({ totalIncome, totalExpenses, balance }) => {
    return (
        <div>
            <Row className='flex flex-wrap justify-between items-center ml-10 lg:mx-10 md:mx-10 gap-4'>
                <Card className="shadow-lg min-w-[90%] md:min-w-[450px] lg:min-w-[550px] h-[250px] p-4 text-center m-2" title="Current Balance">
                    <h3 className='m-0 text-[40px] p-4 sm:p-6 lg:p-10'>${balance}</h3>
                </Card>
                <Card className="shadow-lg min-w-[90%] md:min-w-[450px] lg:min-w-[550px] h-[250px] p-4 text-center m-2" title="Curren Income">
                    <p className='m-0 text-base text-[22px] py-4 sm:py-5 lg:py-5'>${totalIncome}</p>
                    <Link to="/income"><Button text="Add Income" green={true} /></Link>
                </Card>
                <Card className="shadow-lg min-w-[90%] md:min-w-[450px] lg:min-w-[550px] h-[250px] p-4 text-center m-2" title="Current Expense">
                    <p className='m-0 text-base text-[22px] py-4 sm:py-5 lg:py-5'>${totalExpenses}</p>
                    <Link to="/expenses"><Button text="Add Expense" green={true} /></Link>
                </Card>
            </Row>
        </div>
    )
}

export default FirstLineCard