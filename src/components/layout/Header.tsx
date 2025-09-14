import { useState } from 'react';
import { Link } from "react-router-dom";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
       <img src="/vite.svg" alt="EnfermaLink Logo" width="40" height="40" />
      <span className="text-xl font-bold">EnfermaLink</span>
    </Link>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-white px-6 md:hidden">
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-gray-900 text-white w-64 shadow-none border-none">
          <SheetHeader>
            <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
            <SheetDescription className="sr-only">
              Use os links abaixo para navegar pelas seções do site.
            </SheetDescription>
          </SheetHeader>
          <Sidebar onLinkClick={() => setIsMenuOpen(false)} />
        </SheetContent>
      </Sheet>
      <div className="flex-1 text-center">
        <Logo />
      </div>
    </header>
  );
}
