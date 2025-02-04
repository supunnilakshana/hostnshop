import React from "react";
import { Button } from "../components/ui/button";
import {Bell, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import Image from "next/image";


type ToggleSidebarType = (event: React.MouseEvent<HTMLButtonElement>) => void;

interface HeaderProps {
  toggleSidebar: ToggleSidebarType;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <div className="border-b w-full px-2 flex justify-end text-textSecondary items-center py-3">
      <Button
        className="md:hidden bg-transparent focus:bg-transparent hover:bg-transparent"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger className="float-right">
       
          {" "}
          <Bell className="hover:border-none outline-none active:outline-none focus:outline-none rounded-full w-4 h-4 " /> 
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mx-3">
      <DropdownMenu>
        <DropdownMenuTrigger className="float-right">
        <Image src="/assets/images/avatar.jpg" alt="Avatar" width={20} height={20} className="rounded-full"/>
         
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
 
    </div>
  );
};

export default Header;
