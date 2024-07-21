import React from 'react'
import { Card, Row } from "antd"
import Button from "../../common/Button"
import { Link } from 'react-router-dom'

const FirstLineCard = () => {
    return (
        <div>
            <Row className='flex justify-between items-center m-10'>
                <Card className="shadow-lg min-w-[400px] p-1 text-center m-5" title="Current Balance">
                    <p className='m-0 text-[15px]'>$0</p>
                    <Button text="Reset Balance" green={true} />
                </Card>
                <Card className="shadow-lg min-w-[400px] p-1 text-center m-5" title="Current Income">
                    <p className='m-0 text-[15px]'>$0</p>
                    <Link to="/income"><Button text="Add Income" green={true} /></Link>
                </Card>
                <Card className="shadow-lg min-w-[400px] p-1 text-center m-5" title="Current Expense">
                    <p className='m-0 text-[15px]'>$0</p>
                    <Link to="/expenses"><Button text="Add Expense" green={true} /></Link>
                </Card>
            </Row>
        </div>
    )
}

export default FirstLineCard