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
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
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

      <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
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
          <Link href='#'>Customers</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='#'>
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem>
          {props.role === 'admin' ? (
            <Button
              as={Link}
              color='warning'
              href='/dashboard/registerEquipment'
              variant='flat'
            >
              Rejestracja wózka
            </Button>
          ) : null}
        </NavbarItem>
        <NavbarItem>
          <LogOut />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            className='w-full'
            color={'foreground'}
            href='/dashboard'
            size='lg'
          >
            Tablica
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
