"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

import { useUserAuth } from "@/app/hooks/useUserAuth"

const Navbar = () => {
  const router = useRouter()
  const { signOutUser, isSuccess, data } = useUserAuth()
  return (
    <nav className="navbar bg-base-300">
      <div className="navbar-start flex gap-4">
        <Link href={"/"}>Home</Link>
        {isSuccess && <Link href={"/about"}>About</Link>}
      </div>
      {isSuccess && (
        <>
          <div className="navbar-center">{data?.user.email}</div>
          <div className="navbar-end">
            <div
              className="link"
              onClick={() => {
                signOutUser()
                router.push("/")
              }}
            >
              Sign Out
            </div>
          </div>
        </>
      )}
    </nav>
  )
}

export default Navbar
