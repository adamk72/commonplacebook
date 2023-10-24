import React, { ReactElement } from 'react'

type LabelAndFieldProps = {
  placeholder?: string,
  type: string,
  name?: string,
  id?: string,
  label: string,
  labelLink?: ReactElement
}

const LabelAndField = (props: LabelAndFieldProps) => {
  const { placeholder, type, name, id, label, labelLink } = props;
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <label htmlFor={id} className="block mb-2 text-sm text-gray-600 dark:text-gray-400">{label}</label>
        {labelLink}
      </div>
      <input type={type} name={name} id={id} placeholder={placeholder} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
    </div>
  )
}

export default LabelAndField
