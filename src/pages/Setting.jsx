import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';

const Setting = () => {
    return (
        <div className='flex items-center justify-center h-screen'>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Link to="/dashboard"><button
                        className='w-[40%] h-[50px] bg-white border-2 rounded-lg font-semibold hover:bg-primary hover:text-white'
                    >Back Home</button></Link>
                }
            />
        </div>

    )
}

export default Setting