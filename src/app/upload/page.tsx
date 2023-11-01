"use client"

import FormArrayContextProvider from "@/components/providers/FormArrayContextProvider"
import UserBulkUploadForm from "@/components/userBulkUpload/UserBulkUploadForm"

const Upload = () => {
  return (
    <FormArrayContextProvider>
      <UserBulkUploadForm />
    </FormArrayContextProvider>
  )
}

export default Upload
