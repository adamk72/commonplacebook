import React, { ReactElement } from "react"
import { FieldErrors, UseFormRegister } from "react-hook-form"

import { SignUpIn } from "./SignUpIn"

type LabelAndFieldProps = {
  placeholder?: string
  type: string
  name: keyof SignUpIn
  id?: string
  label: string
  labelLink?: ReactElement
  errors?: FieldErrors<SignUpIn>
  register: UseFormRegister<SignUpIn>
}

const LabelAndField = (props: LabelAndFieldProps) => {
  const { placeholder, type, name, id, label, labelLink, errors, register } =
    props
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <label
          htmlFor={id}
          className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
        >
          {label}
        </label>
        {labelLink}
      </div>
      <input
        type={type}
        id={id}
        {...register(name)}
        placeholder={placeholder}
        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
      />
      {errors && errors[name] && (
        <span className="text-red-900">{errors[name]?.message}</span>
      )}
    </div>
  )
}

export default LabelAndField
