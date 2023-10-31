import { SubmitHandler, useForm } from "react-hook-form"

import Button from "../Button"

type UserBulkUploadFormFields = {
  textarea: HTMLTextAreaElement
}

const UserBulkUploadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserBulkUploadFormFields>()
  const onSubmit: SubmitHandler<UserBulkUploadFormFields> = (data) => {
    const array = data.textarea.split("\n").sort()
    console.log(array)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea {...register("textarea")} />
      <Button type="submit" label="Submit" />
    </form>
  )
}

export default UserBulkUploadForm
