'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    ...(user ? [
      { name: 'Create Post', href: '/create-post' },
      { name: 'My Posts', href: '/my-posts' }
    ] : []),
  ]

  return (
    <header className="bg-white shadow-md transition-transform duration-500 ease-in-out">
      <Disclosure as="nav" className="bg-gradient-to-r from-primary to-blue-600">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <Link href="/" className="flex flex-shrink-0 items-center">
                    <span className="text-2xl font-bold text-white">TechInsight</span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  {user ? (
                    <button
                      onClick={logout}
                      className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                      Login
                    </Link>
                  )}
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                {user ? (
                  <Disclosure.Button
                    as="button"
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    Logout
                  </Disclosure.Button>
                ) : (
                  <Disclosure.Button
                    as="a"
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    Login
                  </Disclosure.Button>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  )
}

