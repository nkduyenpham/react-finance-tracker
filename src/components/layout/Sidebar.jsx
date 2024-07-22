import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, Wallet, CircleDollarSign, Settings } from 'lucide-react'

const Sidebar = () => {

    // Check if link is active 
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className='h-screen p-5 shadow-sm border'>
            <div className='flex justify-center p-5'>
                <h2 className='text-xl font-bold'>PERFIN.</h2>
            </div>
            <hr className='my-6 border' />
            <div className='mt-3'>
                <Link to="/dashboard" className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${isActive("/") ? "bg-primary text-white" : ""}`}>
                    <HomeIcon />
                    <h2 className='text-lg'>Home</h2>
                </Link>
                <Link to="/income" className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${isActive("/income") ? "bg-primary text-white" : ""}`}>
                    <Wallet />
                    <h2 className='text-lg'>Income</h2>
                </Link>
                <Link to="/expenses" className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${isActive("/expenses") ? "bg-primary text-white" : ""}`}>
                    <CircleDollarSign />
                    <h2 className='text-lg'>Expenses</h2>
                </Link>
                <Link to="/setting" className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${isActive("/setting") ? "bg-primary text-white" : ""}`}>
                    <Settings />
                    <h2 className='text-lg'>Setting</h2>
                </Link>
            </div>
            <div className='text-sm pt-[800px]'>
                PERFIN. by Duyen Pham
                <br />@ 2024 all right reserved
            </div>
        </nav>
    )
}

export default Sidebar