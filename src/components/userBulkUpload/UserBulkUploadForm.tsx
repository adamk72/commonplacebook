import { useContext } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import DisplayList from "./DisplayList"
import Button from "../Button"
import { FormContext } from "../providers/FormArrayContextProvider"

type UserBulkUploadFormFields = {
  text: string
}

const UserBulkUploadForm = () => {
  const { setArray } = useContext(FormContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserBulkUploadFormFields>()
  const onSubmit: SubmitHandler<UserBulkUploadFormFields> = (data) => {
    const array = data.text.split("\n").sort()
    setArray(array)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea {...register("text")} />
      <Button type="submit" label="Submit" />
      <DisplayList />
    </form>
  )
}

export default UserBulkUploadForm
