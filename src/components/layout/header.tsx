"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, FunctionSquare } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/formulas', label: 'Formulas' },
  { href: '/ai-suggester', label: 'AI Suggester' },
  { href: '/problem-solving', label: 'Problem Solving' },
];

export default function Header() {
  const pathname = usePathname();

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn('flex items-center gap-4 lg:gap-6', className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname?.startsWith(link.href) ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <FunctionSquare className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              ExcelPro
            </span>
          </Link>
          <NavLinks />
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                    <FunctionSquare className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">ExcelPro</span>
                </Link>
              <div className="flex flex-col space-y-3">
                 {navLinks.map((link) => (
                    <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        'text-sm font-medium transition-colors hover:text-primary',
                        pathname?.startsWith(link.href) ? 'text-primary' : 'text-muted-foreground'
                    )}
                    >
                    {link.label}
                    </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
           <Link href="/" className="flex items-center space-x-2">
            <FunctionSquare className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">ExcelPro</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="hidden md:flex items-center space-x-2">
                 <Button variant="ghost" asChild>
                    <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                </Button>
            </div>
        </div>
      </div>
    </header>
  );
}
