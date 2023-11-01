const DisplayList = ({ array }: { array: string[] }) => {
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
