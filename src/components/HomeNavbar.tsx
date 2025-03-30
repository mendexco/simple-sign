import type { FC } from 'react'

import { Button, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import { FaGithub } from 'react-icons/fa'

import { ThemeSwitcher } from '@components/ThemeSwitcher'

import { UNPROTECTED_ROUTES } from '@utils/constants'

export const HomeNavbar: FC = () => {
  return (
    <Navbar>
      <NavbarBrand className="gap-2">
        <FaGithub size={32} />
        <p className="font-bold text-inherit">Github</p>
      </NavbarBrand>
      <NavbarContent
        className="sm:flex gap-4"
        justify="center"
      >
        <NavbarItem isActive>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent
        className="gap-2"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex">
          <Button
            as={Link}
            className="font-semibold"
            color="primary"
            href={UNPROTECTED_ROUTES.SIGN_IN}
            variant="light"
          >
            sign-in
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            className="font-semibold"
            color="primary"
            href={UNPROTECTED_ROUTES.SIGN_UP}
            variant="flat"
          >
            sign-up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
