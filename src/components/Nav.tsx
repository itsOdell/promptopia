"use client"

import Link from "next/link"
import Image from "next/image"
import DropdownItem from "@components/DropdownItem"
import { useState, useEffect, SetStateAction } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

export default function Nav() {
  const { data: session } = useSession()
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)

  useEffect(() => {
    async function storeProviders() {
      const res = await getProviders()
      setProviders(res as SetStateAction<null>)
    }

    storeProviders()
  })

  return (
    <nav className="flex_between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex_center">
        <Image
          src="/assets/images/logo.svg"
          alt="Proptopia logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create" className="black_btn">
              Create Prompt
            </Link>

            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={String(session.user.image)}
                alt="User Profile Image"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map(provider => {
                return (
                  <button
                    type="button"
                    key={provider!.name}
                    onClick={() => signIn(provider!.id)}
                    className="black_btn">
                    Sign In
                  </button>
                )
              })}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={String(session.user.image)}
              width={37}
              height={37}
              className="rounded-full cursor-pointer"
              alt="profile"
              onClick={() => {
                setToggleDropdown(prev => !prev)
              }}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <DropdownItem href="/profile" setDropdown={setToggleDropdown}>
                  My Profile
                </DropdownItem>
                <DropdownItem
                  href="/create-prompt"
                  setDropdown={setToggleDropdown}>
                  Create Prompt
                </DropdownItem>
                <button
                  type="button"
                  className="mt-2 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map(provider => {
                return (
                  <button
                    type="button"
                    key={provider!.name}
                    onClick={() => signIn(provider!.id)}
                    className="black_btn">
                    Sign In
                  </button>
                )
              })}
          </>
        )}
      </div>
    </nav>
  )
}
