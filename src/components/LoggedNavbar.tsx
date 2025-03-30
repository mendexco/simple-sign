import type { FC } from 'react'

import { Button, Navbar, NavbarContent, NavbarItem } from '@heroui/react'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { CiLogout } from 'react-icons/ci'
import { FaFileSignature } from 'react-icons/fa'
import { IoReturnDownBack } from 'react-icons/io5'

import { useRouter } from '@hooks'

import { ThemeSwitcher } from '@components/ThemeSwitcher'

import { PROTECTED_ROUTES } from '@utils/constants'

export const LoggedNavbar: FC = () => {
  const pathname = usePathname()
  const router = useRouter()
  const isDashboard = pathname === PROTECTED_ROUTES.DASHBOARD

  return (
    <Navbar>
      <NavbarContent justify="start">
        <NavbarItem isActive>
          {isDashboard ? (
            <Button
              className="font-semibold"
              size="sm"
              startContent={<CiLogout size={16} />}
              variant="light"
              onPress={() => signOut()}
            >
              sign-out
            </Button>
          ) : (
            <Button
              isIconOnly
              radius="full"
              size="lg"
              variant="light"
              onPress={() => router.back()}
            >
              <IoReturnDownBack size={32} />
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="center">
        <NavbarItem isActive>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Button
            className="font-semibold"
            endContent={<FaFileSignature size={16} />}
            size="sm"
            onPress={() => router.push(PROTECTED_ROUTES.UPLOAD)}
          >
            upload
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
