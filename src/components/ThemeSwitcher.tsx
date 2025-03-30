'use client'

import { FC } from 'react'

import { type SwitchProps, useSwitch } from '@heroui/react'
import { useIsSSR } from '@react-aria/ssr'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { IoMdSunny } from 'react-icons/io'
import { IoMoon } from 'react-icons/io5'

export interface ThemeSwitcherProps {
  className?: string
  classNames?: SwitchProps['classNames']
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className, classNames }) => {
  const { theme, setTheme } = useTheme()
  const isSSR = useIsSSR()

  const onChange = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } = useSwitch({
    'aria-label': `Switch to ${theme === 'light' || isSSR ? 'dark' : 'light'} mode`,
    isSelected: theme === 'light' || isSSR,
    onChange
  })

  return (
    <Component
      {...getBaseProps({
        className: clsx('px-px transition-opacity hover:opacity-80 cursor-pointer', className, classNames?.base)
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              'w-auto h-auto',
              'bg-transparent',
              'rounded-lg',
              'flex items-center justify-center',
              'group-data-[selected=true]:bg-transparent',
              '!text-default-500',
              'pt-px',
              'px-0',
              'mx-0'
            ],
            classNames?.wrapper
          )
        })}
      >
        {!isSelected || isSSR ? <IoMdSunny size={24} /> : <IoMoon size={24} />}
      </div>
    </Component>
  )
}
