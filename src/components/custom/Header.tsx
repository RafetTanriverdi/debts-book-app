'use client';
import { signOut } from '@rt/actions/user';
import { Button } from '@rt/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@rt/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@rt/components/ui/navigation-menu';
import { useMutation } from '@tanstack/react-query';
import {
  CircleUserRound,
  LogOutIcon,
  Moon,
  Settings,
  Sun,
  User,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function Header() {
  const { setTheme, theme } = useTheme();

  const router = useRouter();

  const handleLogoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await signOut();
    },
    onSuccess: () => {
      router.replace('/login');
    },
  });

  const pageList: {
    title: string;
    href: string;
    icon?: React.ReactNode;
  }[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Customers',
      href: '/customers',
    },
    {
      title: 'Products',
      href: '/products',
    },
  ];

  return (
    <header className="relative flex shadow-muted-foreground dark:border-b-1 dark:border-zinc-800 border-b-1 border-zinc-200   min-h-14  items-center">
      <Link href={'/'}>Logo</Link>

      <NavigationMenu>
        <NavigationMenuList>
          {pageList.map((item) => {
            return (
              <React.Fragment key={item.title}>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href={item.href}
                    className={navigationMenuTriggerStyle()}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </React.Fragment>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer ">
          <Button variant={'ghost'} size={'icon'}>
            <CircleUserRound className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56  ">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer">
              <User />
              <Link href={'/profile'}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings />
              <Link href={'/settings'}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleLogoutMutation.mutate()}
            >
              <LogOutIcon />
              <span>LogOut</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant={'outline'}
        size={'icon'}
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <span suppressHydrationWarning>
          {theme === 'light' ? (
            <Moon className="size-5" />
          ) : (
            <Sun className="size-5" />
          )}
        </span>
      </Button>
    </header>
  );
}

export default Header;
