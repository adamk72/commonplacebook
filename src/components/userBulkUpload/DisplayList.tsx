import { useContext } from "react"

import { FormContext } from "../providers/FormArrayContextProvider"

// This could probably just take props, but chose to use context for practice.
const DisplayList = () => {
  const { array } = useContext(FormContext)

  return (
    <div>
      {array.length > 0 && (
        <ul>
          {array.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DisplayList
