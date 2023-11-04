import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react"

import { ReactChildren } from "@/lib/types"

export const FormContext = createContext<{
  array: string[]
  setArray: Dispatch<SetStateAction<string[]>>
}>({ array: [], setArray: () => [] })

const FormArrayContextProvider = ({ children }: ReactChildren) => {
  const [array, setArray] = useState([] as string[])
  const value = useMemo(() => ({ array, setArray }), [array])
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export default FormArrayContextProvider
