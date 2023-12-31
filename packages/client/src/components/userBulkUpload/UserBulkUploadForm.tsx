import { SubmitHandler, useForm } from "react-hook-form"

import { useAddWordsViaArray } from "./addWordList"
import DisplayList from "./DisplayList"
import Button from "../Button"

type UserBulkUploadFormFields = {
  text: string
}

const UserBulkUploadForm = () => {
  const {
    mutate,
    error,
    isSuccess,
    isPending,
    data: mutatedData,
  } = useAddWordsViaArray()
  const { register, handleSubmit } = useForm<UserBulkUploadFormFields>()
  const onSubmit: SubmitHandler<UserBulkUploadFormFields> = (data) => {
    const array = data.text.split("\n").sort()
    mutate(array)
  }

  return (
    <div className="flex p-4 gap-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea rows={10} {...register("text")} />
        <Button type="submit" label="Submit" />
      </form>
      <div className="flex flex-col gap-3">
        <span>Added</span>
        {mutatedData && mutatedData.fulfilled && (
          <DisplayList array={mutatedData.fulfilled} />
        )}
        <span>Rejected</span>
        {mutatedData && mutatedData.rejected && (
          <DisplayList
            array={mutatedData.rejected.map(
              (w: { word: string; message: string }) => w
            )}
          />
        )}
      </div>
      <div className="flex flex-col p-4 gap-3 border border-red-300">
        <span>{isSuccess ? "Success" : "--"}</span>
        <span>{isPending ? "Loading" : "--"}</span>
        <span>{error ? error.message : "--"}</span>
      </div>
    </div>
  )
}

export default UserBulkUploadForm
