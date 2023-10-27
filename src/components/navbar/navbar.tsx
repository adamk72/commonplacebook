import Link from "next/link"
import React from "react"

const navbar = () => {
  return (
    <nav className="navbar bg-base-300">
      <div className="flex gap-4">
        <Link href={"/"}>Home</Link>
        <Link href={"/about"}>About</Link>
      </div>
    </nav>
  )
}

export default navbar
