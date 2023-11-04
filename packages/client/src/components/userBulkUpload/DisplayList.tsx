import React from "react"

const DisplayList = ({
  array,
}: {
  array: string[] | { word: string; message: string }[]
}) => {
  return (
    <div>
      {array.length > 0 && (
        <ul>
          {array.map((item, index) => {
            if (typeof item === "string") return <li key={index}>{item}</li>
            return (
              <li key={index}>
                {item.word} b/c {item.message}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default DisplayList
