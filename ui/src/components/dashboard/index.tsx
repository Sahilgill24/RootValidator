import { useState } from "react";
import DKGCeremonyDashboard from "./dkg";
import { NavItem } from "@/lib/types";
import Navbar from "./navbar";

const Dashboard = () => {
  const navItems: NavItem[] = [
    {
      label: "DKG Ceremony",
      component: <DKGCeremonyDashboard />,
    },
  ];
  const [activeNavItem, setActiveNavItem] = useState<NavItem>(navItems[0]);

  return (
    <div className="mx-auto h-screen pt-4 md:w-[72vw] xl:w-[60vw] relative">
      <Navbar
        activeNavItem={activeNavItem}
        setActiveNavItem={setActiveNavItem}
        navItems={navItems}
      />
      <div className="mt-10 flex w-full flex-col gap-8 px-4">
        {activeNavItem.component}
      </div>
    </div>
  );
};

export default Dashboard;
