import { ButtonHTMLAttributes } from "react"

const Button = ({
  label,
  type = "button",
}: {
  label: string
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
}) => {
  return (
      <button
        type={type}
        className="px-3 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
      >
        {label}
      </button>
  )
}

export default Button
