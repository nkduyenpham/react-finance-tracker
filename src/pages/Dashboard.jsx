import React from 'react'
import Card from '../components/common/Card'

const Dashboard = () => {
    return (
        <div>
            <div className='grid col-span-3'>
                <Card />
                <Card />
                <Card />
            </div>
            <div>
                <p>Chart</p>
            </div>
        </div>
    )
}

export default Dashboard