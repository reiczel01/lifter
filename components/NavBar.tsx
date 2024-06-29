'use client';
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
} from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import LogOut from '@/components/LogOut';
import { cookies } from 'next/headers';
import { getCookieUserData } from '@/app/api/auth/cookie/route';
interface NavBarProps {
  role: string;
}

export default function NavBar(props: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = usePathname();
  const isActive = (href: string) => router === href;

  return (
    <Navbar
      maxWidth={'xl'}
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      <NavbarContent className='pr-3 sm:hidden' justify='center'>
        <NavbarBrand>
          <p className='font-bold text-inherit'>LIFTER</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className='hidden gap-4 uppercase sm:flex'
        justify='center'
      >
        <NavbarBrand>
          <Image
            height={35}
            width={35}
            className='aspect-w-3 aspect-h-3 mr-0.5 object-cover'
            src='/Logo.svg'
            alt='Logo'
          />
          <p>|</p>
          <p className='font-bold text-inherit'>&ensp;LIFTER</p>
        </NavbarBrand>
        <NavbarItem isActive={isActive('/dashboard' ? 'true' : 'false')}>
          <Link
            color='foreground'
            className={isActive('/dashboard') ? 'font-bold text-blue-700' : ''}
            href='/dashboard'
          >
            Tablica
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color='foreground'
            className={
              isActive('/dashboard/tasks') ? 'font-bold text-blue-700' : ''
            }
            href='/dashboard/tasks'
          >
            Zadania
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color='foreground'
            className={
              isActive('/dashboard/user') ? 'font-bold text-blue-700' : ''
            }
            href='/dashboard/user'
          >
            Profil operatora
          </Link>
        </NavbarItem>
        <NavbarItem>
          {props.role === 'admin' ? (
            <Link
              color='foreground'
              className={
                isActive('/dashboard/userAdministration')
                  ? 'font-bold text-blue-700'
                  : ''
              }
              href='/dashboard/userAdministration'
            >
              Zarządzanie użytkownikami
            </Link>
          ) : null}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className='hidden justify-end md:flex'>
        <NavbarItem>
          {props.role === 'admin' ? (
            <Button
              as={Link}
              color='warning'
              href='/dashboard/registerEquipment'
              variant='flat'
              className='normal-case'
            >
              Rejestracja sprzętu
            </Button>
          ) : null}
        </NavbarItem>
        <NavbarItem>
          <LogOut />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem className='text-4xl font-bold uppercase'>
          <Link
            className={`w-full ${isActive('/dashboard') ? 'text-blue-700' : ''}`}
            color={'foreground'}
            href='/dashboard'
            size='lg'
          >
            Tablica
          </Link>
          <Link
            className={`w-full ${isActive('/dashboard/tasks') ? 'text-blue-700' : ''}`}
            color={'foreground'}
            href='/dashboard/tasks'
            size='lg'
          >
            Zadania
          </Link>
          <Link
            className={`w-full ${isActive('/dashboard/page.tsx') ? 'text-blue-700' : ''}`}
            color={'foreground'}
            href='/dashboard/user'
            size='lg'
          >
            Profil operatora
          </Link>
          {props.role === 'admin' ? (
            <Link
              color='foreground'
              className={`w-full
                ${
                  isActive('/dashboard/userAdministration')
                    ? 'text-lg text-blue-700'
                    : ''
                }`}
              href='/dashboard/userAdministration'
            >
              Zarządzanie użytkownikami
            </Link>
          ) : null}
          <NavbarContent className='flex h-full flex-col items-start justify-end gap-3 md:hidden'>
            <div className='mt-auto'>
              <NavbarItem>
                {props.role === 'admin' ? (
                  <Button
                    as={Link}
                    color='warning'
                    href='/dashboard/registerEquipment'
                    variant='flat'
                    className='normal-case'
                  >
                    Rejestracja sprzętu
                  </Button>
                ) : null}
              </NavbarItem>
              <NavbarItem className='mt-2'>
                <LogOut />
              </NavbarItem>
            </div>
          </NavbarContent>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
