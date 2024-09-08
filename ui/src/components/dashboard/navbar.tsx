import { NavItem } from "@/lib/types";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useDisconnect } from "wagmi";
import CopyAddress from "../ui/copy-address";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

type NavbarProps = {
  navItems: NavItem[];
  activeNavItem: NavItem;
  setActiveNavItem: (navItem: NavItem) => void;
};

const Navbar = (props: NavbarProps) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();

  return (
    <div className="w-full shadow-md rounded-full bg-card/20 backdrop-blur-lg border-b-2 px-4 py-2 flex flex-row justify-between items-center">
      <div className="flex flex-row items-center gap-4">
        <p className="text-lg font-bold text-primary mr-2">RootValidator</p>
        {props.navItems.map((item, index) => (
          <NavButton
            key={index}
            navItem={item}
            activeNavItem={props.activeNavItem}
            setActiveNavItem={props.setActiveNavItem}
          />
        ))}
      </div>
      <div className="flex flex-row gap-4 items-center">
        {address ? (
          <>
            <CopyAddress
              className="text-sm font-medium text-secondary-foreground"
              address={address}
            />
            <button
              onClick={() => {
                disconnect();
                navigate("/");
              }}
              className="rounded-full border-l border-r text-primary p-2"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </>
        ) : (
          <Button>Connect Wallet</Button>
        )}
      </div>
    </div>
  );
};

const NavButton = ({
  navItem,
  activeNavItem,
  setActiveNavItem,
}: {
  navItem: NavItem;
  activeNavItem: NavItem;
  setActiveNavItem: (navItem: NavItem) => void;
}) => {
  return (
    <button
      className={`border-t rounded-full px-4 py-1 text-sm cursor-pointer text-secondary-foreground 
        ${navItem.label == activeNavItem.label && 'border-none bg-primary text-black'}`}
      onClick={() => setActiveNavItem(navItem)}
    >
      {navItem.label}
    </button>
  );
};

export default Navbar;
