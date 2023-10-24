import { ButtonHTMLAttributes } from "react"

const Button = ({
  label,
  type,
}: {
  label: string
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
}) => {
  return (
    <div className="mb-6">
      <button
        type={type}
        className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
      >
        {label}
      </button>
    </div>
  )
}

export default Button
