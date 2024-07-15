import React from 'react'

const HeaderBeforeLogin = () => {

    const logOut = () => {
        alert("logout!")
    }

    return (
        <div className='w-full flex justify-between p-5 border shadow-sm px-10 bg-primary'>
            <p className='font-bold text-lg'>PERFINC.</p>
            <p className='hover:cursor-pointer' onClick={logOut}>Logout</p>
        </div>
    )
}

export default HeaderBeforeLogin