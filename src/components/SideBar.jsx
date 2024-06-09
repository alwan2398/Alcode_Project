import { BookImage, ChevronFirst, ChevronLast, Code2Icon, MessageSquare, MoreVertical, UserCircle2 } from "lucide-react";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export default function Sidebar({ onMenuItemClick }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="flex flex-col h-screen">
      <nav className="flex flex-col flex-1 bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <h2 className={`flex items-center font-primaryFont font-bold text-2xl text-primary overflow-hidden transition-all ${expanded ? "" : "sr-only"}`}>
            <span><Code2Icon className="mr-3"/> </span>
            AlCode
          </h2>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <hr className="mt-3"></hr>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 overflow-y-auto">
            <SidebarItem icon={<BookImage size={24} />} text="Project" onClick={() => onMenuItemClick("Project")} />
            <SidebarItem icon={<MessageSquare size={24} />} text="Contact" onClick={() => onMenuItemClick("Contact")} />
          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <UserCircle2 className="w-9 h-9 rounded-md text-gray-500"/>
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">User Icon</h4>
              <span className="text-xs text-gray-600">usericon@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, onClick }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      onClick={onClick}
      className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-primary hover:text-white text-gray-600"
    >
      <span className="mr-3">{icon}</span>
      <span className={`overflow-hidden transition-all ${expanded ? "" : "w-0"}`}>
        {text}
      </span>
    </li>
  );
}
