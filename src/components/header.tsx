"use client"

import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const projetosItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "Compare cidades em diferentes variáveis de mobilidade com visualização gráfica em formato de radar e de distribuição",
  },
  {
    title: "Catálogo de Dados",
    href: "/catalago-de-dados",
    description: "Compare indicadores de mobilidade entre cidades brasileiras por meio de uma tabela interativa",
  },
  {
    title: "Geoportal",
    href: "/geoportal",
    description: "Visualize dados espaciais de mobilidade urbana em um mapa interativo com diversas camadas temáticas",
  },
  {
    title: "Tabela PEMOB",
    href: "/dashboard",
    description: "Compare indicadores de mobilidade entre cidades brasileiras por meio de uma tabela interativa",
  },
]

const menuItems = [
  { title: "Home", href: "/" },
  { title: "Sobre", href: "/sobre", isActive: true },
  { title: "Publicações", href: "/publicacoes" },
  { title: "Eventos", href: "/eventos" },
  { title: "Vídeos", href: "/videos" },
  { title: "Notícias", href: "/noticias" },
  { title: "Cursos", href: "/cursos" },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-28 items-center justify-between px-4">
        {/* Logo and Desktop Navigation (keep this part exactly the same) */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center gap-4">
              {/* Main Logo Graphic */}
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Logo Observatório"
                  width={80}
                  height={80}
                  className="h-20 w-auto"
                  priority
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/" className="text-gray-400 hover:text-black">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-400 hover:text-black">
                Projetos
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[600px] gap-3 p-4 md:w-[700px] md:grid-cols-2 lg:w-[800px]">
                  {projetosItems.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/sobre" className="text-black font-bold">
                  Sobre
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/publicacoes" className="text-gray-400 hover:text-black">
                  Publicações
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/eventos" className="text-gray-400 hover:text-black">
                  Eventos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/videos" className="text-gray-400 hover:text-black">
                  Vídeos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/noticias" className="text-gray-400 hover:text-black">
                  Notícias
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/cursos" className="text-gray-400 hover:text-black">
                  Cursos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 text-gray-600 hover:text-black transition-colors"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown (appears below header) */}
      <div 
        className={`lg:hidden absolute left-0 right-0 z-40 bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? "max-h-[80vh] opacity-100 overflow-y-auto" 
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className=" px-4 py-6">
          <nav className="space-y-4">
            {/* Regular Menu Items */}
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={closeMobileMenu}
                className={`block py-3 text-lg font-medium transition-colors ${
                  item.isActive 
                    ? "text-black font-bold" 
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {item.title}
              </Link>
            ))}

            {/* Projetos Section with Accordion */}
            <div className="pt-4 border-t">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="projetos" className="border-none">
                  <AccordionTrigger className="text-lg font-medium text-gray-900 hover:no-underline py-3">
                    Projetos
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      {projetosItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={closeMobileMenu}
                          className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                        >
                          <div className="font-medium text-gray-900 mb-2">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-600">
                            {item.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}