import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TrendingUp, LayoutDashboard, ListChecks, Briefcase, Search, UserCircle, Settings, LogOut, Menu } from 'lucide-react';

const GlobalHeader: React.FC = () => {
  console.log('GlobalHeader loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-cyan-400 ${
      isActive ? 'text-cyan-400' : 'text-gray-300'
    }`;

  const navItems = [
    { href: '/', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { href: '/watchlist', label: 'Watchlist', icon: <ListChecks className="h-5 w-5" /> },
    { href: '/portfolio', label: 'Portfolio', icon: <Briefcase className="h-5 w-5" /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-slate-800 bg-black/70 backdrop-blur-md shadow-lg">
      <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors">
            <TrendingUp className="h-7 w-7 text-cyan-500" />
            <span className="text-xl font-bold tracking-tight">StockDash</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} className={navLinkClasses}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search stocks..."
              className="h-9 w-full rounded-md bg-slate-800 pl-10 pr-4 text-sm text-gray-50 placeholder-gray-400 focus:bg-slate-700 focus:ring-1 focus:ring-cyan-500 border-slate-700"
              // Add search logic here
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 hover:bg-slate-800">
                <Avatar className="h-8 w-8 border-2 border-slate-700 hover:border-cyan-500 transition-colors">
                  <AvatarImage src="/placeholder-avatar.png" alt="User" />
                  <AvatarFallback className="bg-slate-700 text-cyan-400">
                    <UserCircle className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-slate-900 border-slate-800 text-gray-200" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">User Name</p>
                  <p className="text-xs leading-none text-gray-400">user@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-800" />
              <DropdownMenuItem className="hover:bg-slate-800 focus:bg-slate-800 hover:text-cyan-400 focus:text-cyan-400">
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-800 focus:bg-slate-800 hover:text-cyan-400 focus:text-cyan-400">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-800" />
              <DropdownMenuItem className="hover:bg-slate-800 focus:bg-slate-800 hover:text-red-400 focus:text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-cyan-400 hover:bg-slate-800">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-slate-950 border-l-slate-800 p-6">
                <div className="mb-6 flex items-center gap-2 text-white">
                  <TrendingUp className="h-6 w-6 text-cyan-500" />
                  <span className="text-lg font-bold">StockDash</span>
                </div>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search stocks..."
                    className="h-9 w-full rounded-md bg-slate-800 pl-10 pr-4 text-sm text-gray-50 placeholder-gray-400 focus:bg-slate-700 focus:ring-1 focus:ring-cyan-500 border-slate-700"
                  />
                </div>
                <nav className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.href}
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-slate-800 hover:text-cyan-400 ${
                          isActive ? 'bg-slate-800 text-cyan-400' : 'text-gray-300'
                        }`
                      }
                    >
                      {item.icon}
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;