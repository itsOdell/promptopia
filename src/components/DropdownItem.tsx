import Link from "next/link"
import type { SetStateAction, Dispatch } from "react"

interface IDropdownItem {
  href: string
  children: string
  setDropdown: Dispatch<SetStateAction<boolean>>
}

export default function DropdownItem({
  href,
  children,
  setDropdown
}: IDropdownItem) {
  return (
    <Link
      href={href}
      className="dropdown_link"
      onClick={() => setDropdown(false)}>
      {children}
    </Link>
  )
}
