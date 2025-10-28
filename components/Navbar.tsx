import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Toggle } from "@/components/ui/toggle";
import {
  House,
  PackageSearch,
  Handshake,
  Users,
  ChartSpline,
  TrendingDown,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { ModeToggle } from "./ModeToogle";

export function Navbar() {
  return (
    <NavigationMenu className="fixed top-0 right-0 left-0 z-50 px-4 py-2 flex items-center justify-between border-b w-full">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Toggle>
            <House />
            <a href="/">Dashboard</a>
          </Toggle>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Toggle>
            <PackageSearch />
            <a href="/produtos">Produtos</a>
          </Toggle>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Toggle>
            <Handshake />
            <a href="/fornecedores">Fornecedores</a>
          </Toggle>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Toggle>
            <ShoppingCart />
            <a href="/vendas">Vendas</a>
          </Toggle>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Toggle>
            <TrendingDown />
            <a href="/despesas">Despesas</a>
          </Toggle>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Toggle>
            <ChartSpline />
            <a href="/relatorios">Relatórios</a>
          </Toggle>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Toggle>
            <Users />
            <a href="/usuario">Usuários</a>
          </Toggle>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Toggle>
            <Settings />
            <a href="/config">Configuração</a>
          </Toggle>
        </NavigationMenuItem>
      </NavigationMenuList>
      <ModeToggle />
    </NavigationMenu>
  );
}
