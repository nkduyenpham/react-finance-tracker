import React from 'react'

const Button = ({ text, onClick, green, disable }) => {
    return (
        <div
            disable={disable}
            className={`${green ? "bg-primary text-white hover:bg-white hover:text-black" : "bg-white hover:bg-primary hover:text-white"} border shadow-sm p-4 m-3 rounded-lg`}
            onClick={onClick}
        >
            {text}
        </div>
    )
}

export default Button