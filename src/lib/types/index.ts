import { Dispatch, ReactNode } from "react"

export type StrapiRegisteredUser = {
  blocked: boolean
  confirmed: boolean
  createdAt: Date
  email: string
  id: number
  provider: string
  updatedAt: Date
  username: string
}

export type DispatchProps<A, S> = {
  dispatch: Dispatch<A>
  state: S
}

export type ReactChildren = { children: ReactNode }
