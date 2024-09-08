import { NavItem } from '@/lib/types'
import React from 'react'

type NavbarProps = {
  navItems: NavItem[];
  activeNavItem: NavItem;
  setActiveNavItem: (navItem: NavItem) => void;
}

const Navbar = (props: NavbarProps) => {
  return (
    <div>Navbar</div>
  )
}

export default Navbar