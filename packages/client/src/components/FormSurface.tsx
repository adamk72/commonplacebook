import { ReactNode } from "react"

export type FormSurfaceWithTitleProps = {
  title: string
  subtitle?: string
  children: ReactNode
}

const FormSurfaceWithTitle = ({
  title,
  subtitle,
  children,
}: FormSurfaceWithTitleProps) => {
  return (
    <div className="flex items-center bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              {title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>
          </div>
          <div className="m-7">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default FormSurfaceWithTitle
