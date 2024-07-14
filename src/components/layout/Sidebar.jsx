import React, { useEffect, useState } from 'react';
import { HomeIcon, CircleDollarSign, ArrowLeftRight, Settings } from 'lucide-react';
import { useLocation } from 'react-router-dom';


const Sidebar = () => {
    const [currentPath, setCurrentPath] = useState("");
    const path = useLocation();

    useEffect(() => {
        setCurrentPath(path.pathname)
    }, [path.pathname])

    const MenuList = [
        {
            name: 'Home',
            icon: HomeIcon,
            path: '/'
        },
        {
            name: 'Income',
            icon: CircleDollarSign,
            path: '/income'
        },
        {
            name: 'Expenses',
            icon: ArrowLeftRight,
            path: '/expenses'
        },
        {
            name: 'Settings',
            icon: Settings,
            path: '/settings'
        }
    ]

    return (
        <div className='h-screen p-5 shadow-sm border'>
            <div className='flex justify-center'>
                <img src="../../../public/logo.svg" alt="logo" width={80} height={80} />
            </div>
            <hr className='my-6 border' />
            <div className='mt-3'>
                {MenuList.map((menu) => (
                    <div key={menu.name} className={`flex gap-2 mb-2 p-3
                                            hover:bg-primary hover:text-white rounded-lg cursor-pointer
                                            ${currentPath === menu.path ? 'bg-primary text-white' : ''}
                                            `}>
                        <menu.icon className='h-6 w-6' />
                        <h2 className='text-lg'>{menu.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar