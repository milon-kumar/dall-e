import React from 'react'

const FormFiled = ({ labelName, type, name, placeholder, value, handelChange, isSurpriseMe, handelSurpriseMe }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label
          htmlFor={name}
          className='black text-sm font-medium text-gray-900'
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
          type='button'
          onClick={handelSurpriseMe}
            className='font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black'
          >
            Surpries Me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handelChange}
        required
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
      />
    </div>

  )
}

export default FormFiled



























