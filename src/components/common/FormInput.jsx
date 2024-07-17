import React from 'react'

const FormInput = ({ label, state, setState, placeholder, type }) => {
    return (
        <div className='grid'>
            <p className='m-2 text-left mx-3'>{label}</p>
            <input
                type={type}
                value={state}
                placeholder={placeholder}
                onChange={(e) => setState(e.target.value)}
                className='border shadow-sm rounded-lg px-5 py-5 m-3'
            />
        </div>
    )
}

export default FormInput 