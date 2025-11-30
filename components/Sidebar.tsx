import React from 'react';
import { LayoutDashboard, Inbox, BookOpen, CheckSquare, Users, Settings, LogOut, Hexagon } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col w-64 bg-white h-screen fixed left-0 top-0 border-r border-slate-100 py-8 px-6 z-10 overflow-y-auto">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="bg-purple-600 p-2 rounded-xl">
           <Hexagon className="w-5 h-5 text-white fill-current" />
        </div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">Learnly</h1>
      </div>

      <div className="space-y-1 mb-8">
        <p className="text-xs font-semibold text-slate-400 mb-4 px-2 uppercase tracking-wider">Overview</p>
        <SidebarLink icon={<LayoutDashboard size={20} />} label="Dashboard" active />
        <SidebarLink icon={<Inbox size={20} />} label="Inbox" />
        <SidebarLink icon={<BookOpen size={20} />} label="Lesson" />
        <SidebarLink icon={<CheckSquare size={20} />} label="Task" />
        <SidebarLink icon={<Users size={20} />} label="Group" />
      </div>

      <div className="space-y-4 mb-auto">
        <p className="text-xs font-semibold text-slate-400 mb-2 px-2 uppercase tracking-wider">Friends</p>
        <FriendRow name="Bagas Mahpie" role="Friend" img="https://picsum.photos/100/100?random=1" />
        <FriendRow name="Sir Dandy" role="Old Friend" img="https://picsum.photos/100/100?random=2" />
        <FriendRow name="Jhon Tosan" role="Friend" img="https://picsum.photos/100/100?random=3" />
      </div>

      <div className="space-y-1 mt-8">
        <p className="text-xs font-semibold text-slate-400 mb-4 px-2 uppercase tracking-wider">Settings</p>
        <SidebarLink icon={<Settings size={20} />} label="Setting" />
        <button className="flex items-center gap-4 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group">
          <LogOut size={20} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

const SidebarLink: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <button
    className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-xl transition-all duration-200 ${
      active
        ? 'text-purple-600 bg-purple-50 font-bold shadow-sm shadow-purple-100'
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 font-medium'
    }`}
  >
    <div className={active ? "scale-110 transition-transform" : ""}>{icon}</div>
    <span className="text-sm">{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-600" />}
  </button>
);

const FriendRow: React.FC<{ name: string; role: string; img: string }> = ({ name, role, img }) => (
  <div className="flex items-center gap-3 px-2 py-1 cursor-pointer hover:bg-slate-50 rounded-lg p-2 transition-colors">
    <img src={img} alt={name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
    <div>
      <h4 className="text-sm font-bold text-slate-700">{name}</h4>
      <p className="text-xs text-slate-400">{role}</p>
    </div>
  </div>
);

export default Sidebar;