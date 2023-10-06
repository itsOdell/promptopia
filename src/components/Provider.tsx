"use client"

import { SessionProvider } from "next-auth/react"
import type { ReactNode } from "react"

interface IProvider {
  children: ReactNode
  session?: any
}

export default function Provivder({ children, session }: IProvider) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
