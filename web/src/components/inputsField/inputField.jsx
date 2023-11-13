import { Eye, EyeSlash, Warning } from 'phosphor-react';
import React, { useState } from "react";

const InputField = ({
  placeholder,
  ErroName,
  label,
  icon,
  Valid,
  borderValue,
  onChange,
  onFocus,
  onBlur,
  value,
  validMsg,
  name,
  type,
  eye
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [inputType, setInputType] = useState(type); // Adicione uma variável para controlar o tipo de input

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    setInputType(inputType === 'password' ? 'text' : 'password');
  };
  return (
    <div className="relative justify-center flex flex-col flex-1 w-full my-8">
    <input
      className={`border-[1px] bg-white rounded-md pl-10 peer h-14 w-full text-slate-800 placeholder-transparent placeholder:pl-2 focus:placeholder-lineinwhite focus:outline-none focus:border-2
      ${!Valid ? 
        borderValue
        ? "border-red-500 focus:border-red-500" 
        : "focus:border-primary border-lineinwhite"
        : "focus:border-primary border-lineinwhite"
      }`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      name={name}
      type={inputType}
    />

      {eye && (
        <div onClick={togglePasswordVisibility} className='absolute right-3 text-primary text-lg cursor-pointer'>
          {passwordVisible ? <Eye /> : <EyeSlash />}
        </div>
      )}

    {validMsg ? (
      <p className="absolute right-2 select-none -top-5 text-red-500 text-sm flex items-center gap-2">
        <Warning /> {ErroName}
      </p>
    ) : (
      ""
    )}
    <label className={`${!Valid ? 
    borderValue
    ? "text-red-500 peer-focus:text-red-500" 
    : "text-textcomplement peer-focus:text-primary"
    : "text-textcomplement peer-focus:text-primary"
  } absolute whitespace-nowrap
   left-9 select-none -top-3 px-1 text-base bg-white peer-focus:text-base peer-placeholder-shown:text-lg peer-placeholder-shown:top-[13px] pointer-events-none peer-focus:-top-3 peer-focus:transition-all
    peer-focus-visible:transition-all`}>
  {label}
</label>

    <div className={`${!Valid ? 
      borderValue ?
      'text-red-500 peer-focus:text-red-500' 
      : 'text-textcomplement peer-focus:text-primary' 
      :'text-textcomplement peer-focus:text-primary'} w-10 h-14 absolute flex items-center justify-center left-0 p-2`}>
      {icon}
    </div>
  </div>
  )
}

export default InputField