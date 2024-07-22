import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const Setting = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Link to="/dashboard"><button
                    className='w-[20%] h-[50px] bg-white border-2 rounded-lg font-semibold hover:bg-primary hover:text-white'
                >Back Home</button></Link>
            }
        />
    )
}

export default Setting