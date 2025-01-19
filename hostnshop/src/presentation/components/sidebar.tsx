"use client";

import { useState } from "react";
import {
    LayoutDashboard,
    Settings,
    ArrowLeftToLine,
    ArrowRightToLine,
    Combine,
    Box,
    LogIn
  } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import Image from "next/image";


  interface SidebarProps {
    isOpen: boolean;
  }

  const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const [expanded, setExpanded] = useState(true);
   
  
    const menuList = [
      {
        group: "HOME",
        items: [
          {
            link: "/",
            icon: <LayoutDashboard />,
            text: "Dashboard",
          }
        ],
      },
      {
        group: "UTILITIES",
        items: [
          {
            link: "/",
            icon: <Combine/>,
            text: "Categories",
          },
          {
            link: "/profile",
            icon: <Box />,
            text: "Products",
          }
        ],
      },
      {
        group: "AUTH",
        items: [
          {
            link: "/sign-in",
            icon: <LogIn/>,
            text: "Log In",
          }
        ],
      },
  
      {
        group: "EXTRAS",    
        items: [
          {
            link: "/",
            icon: <Settings />,
            text: "Setting",
          }
        
        ],
      },
    ];
    return (
      <aside className={`h-screen  ${isOpen ? "open" : ""}`}>
        <nav
          className={`h-full flex flex-col  inset-0 -z-10 border-r-8 blur-border border-bg_secondary shadow-sm transition-all ${
            expanded ? "w-[260px]" : "w-[80px]"
          }`}
        >
          <div
            className={`p-4 pb-2 flex items-center ${
              expanded ? "justify-between" : "justify-center"
            }`}
          >
            <Image
              src="/assets/images/HostNShop.png"
              alt="HostNShop Logo"
              width={10}
              height={12}
              className={`overflow-hidden transition-all h-10  ${
                expanded ? "w-16" : "w-0"
              }`}
            /> 
            <p  className={`overflow-hidden transition-all h-10  ${
                expanded ? "" : "w-0"
              }`}>HostNShop</p>
            <Button
              className="p-1.5 rounded-lg bg-bg_primary text-accent hover:bg-btn_hover w-10"
              onClick={() => setExpanded((curr: boolean) => !curr)}
            >
              {expanded ? <ArrowLeftToLine /> : <ArrowRightToLine />}
            </Button>
          </div>
  
          <div className="px-3 py-5 flex-1 h-screen bg-accent">
           
              <div>
                  {menuList.map((menu, key) => (
                    <div key={key} className="mb-4">
                      
                      {expanded && (
                        <p className="text-sm font-semibold text-textPrimary uppercase mb-2">
                          {menu.group}
                        </p>
                      )}

                    
                      {menu.items.map((option, optionKey) => (
                        <div
                          key={optionKey}
                          className="flex gap-6 cursor-pointer hover:bg-bg_secondary p-2 rounded-md"
                        >
                          <div className="relative flex items-center mx-auto text-sm rounded-md cursor-pointer text-textSecondary p-1">
                            {option.icon}
                            <span
                              className={`overflow-hidden transition-all ${
                                expanded ? "w-52 ml-3" : "w-0"
                              }`}
                            >
                              {option.text}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            
          </div>

  
          <div className="border-t p-3 flex justify-center">
            <div className="avatar rounded-lg  bg-bg_primary text-accent hover:bg-btn_hover w-10 flex items-center justify-center p-1.5">
              <p>SR</p>
            </div>
            <div
              className={`justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <p className="text-[16px] font-semibold text-textPrimary">
                  User Name
                </p>
                <p className="text-[12px] text-textSecondary">
                  user@example.com
                </p>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    );
  };
  
  export default Sidebar;
  
