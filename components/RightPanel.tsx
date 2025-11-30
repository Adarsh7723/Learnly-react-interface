import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Cell } from 'recharts';
import { MoreVertical, Bell, Plus, UserPlus } from 'lucide-react';

const data = [
  { name: 'Mon', val: 25 },
  { name: 'Tue', val: 45 },
  { name: 'Wed', val: 65 }, // Highlights
  { name: 'Thu', val: 35 },
  { name: 'Fri', val: 55 },
];

const RightPanel: React.FC = () => {
  return (
    <div className="hidden xl:flex flex-col w-96 bg-white h-screen fixed right-0 top-0 border-l border-slate-100 py-8 px-8 z-10 overflow-y-auto font-sans">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <button className="p-3 rounded-full hover:bg-slate-50 text-slate-400 relative transition-colors group">
             <Bell size={20} className="group-hover:text-slate-600" />
             <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </div>
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right hidden sm:block">
            <h4 className="text-sm font-bold text-slate-800">Jason Ranti</h4>
            <p className="text-xs text-slate-400">Student</p>
          </div>
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Profile" className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-50" />
        </div>
      </div>

      {/* Statistic Circle */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-800 text-lg">Statistic</h3>
          <button className="text-slate-400 hover:text-slate-600 transition-colors"><MoreVertical size={20} /></button>
        </div>
        
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] relative overflow-hidden group hover:shadow-[0_20px_50px_-12px_rgba(99,102,241,0.1)] transition-shadow duration-300">
             <div className="flex justify-center mb-6 relative">
                <div className="relative w-48 h-48">
                  {/* Outer glow ring */}
                  <div className="absolute inset-0 bg-purple-50 rounded-full scale-90 blur-xl opacity-50"></div>
                  
                  <svg className="w-full h-full transform -rotate-90 relative z-10">
                    <circle cx="96" cy="96" r="84" stroke="#F8FAFC" strokeWidth="10" fill="none" />
                    <circle 
                        cx="96" 
                        cy="96" 
                        r="84" 
                        stroke="#6366F1" 
                        strokeWidth="10" 
                        fill="none" 
                        strokeDasharray="527" // 2 * pi * 84 = 527.7
                        strokeDashoffset="358" // 32% of 527 = 169. 527 - 169 = 358.
                        strokeLinecap="round" 
                        className="drop-shadow-md text-purple-600"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                      <div className="w-28 h-28 rounded-full p-2 border border-slate-100 bg-white shadow-sm flex items-center justify-center">
                          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" className="w-full h-full rounded-full object-cover" alt="Center" />
                      </div>
                      <span className="absolute top-[15%] right-[10%] bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border-2 border-white">32%</span>
                  </div>
                </div>
             </div>
             <div className="text-center">
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">Good Morning Jason <span className="inline-block animate-bounce">🔥</span></h3>
                <p className="text-sm text-slate-400 mt-2 font-medium leading-relaxed">Continue your learning to achieve your target!</p>
             </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-10">
         <div className="bg-slate-50/50 rounded-[2rem] p-6 h-64 border border-slate-100">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barSize={40}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#94a3b8', fontWeight: 600}} dy={10} />
                <Tooltip cursor={{fill: '#F1F5F9', radius: 10}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px'}} />
                <Bar dataKey="val" radius={[10, 10, 10, 10]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 2 ? '#6366F1' : '#CBD5E1'} className="transition-all hover:opacity-80" />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* Your Mentor */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-800 text-lg">Your mentor</h3>
          <button className="text-slate-400 hover:text-purple-600 bg-slate-50 p-2 rounded-xl transition-colors"><Plus size={16} /></button>
        </div>
        <div className="space-y-4">
           <MentorRow name="Padhang Satrio" role="UI/UX Mentor" />
           <MentorRow name="Zakir Horizontal" role="Branding Mentor" />
           <MentorRow name="Leonardo Samsul" role="Frontend Mentor" />
        </div>
        <button className="w-full mt-6 bg-white border-2 border-slate-100 text-slate-600 text-sm font-bold py-4 rounded-2xl hover:border-purple-200 hover:text-purple-600 hover:bg-purple-50 transition-all">
            See All Mentors
        </button>
      </div>

    </div>
  );
};

const MentorRow: React.FC<{ name: string; role: string }> = ({ name, role }) => (
  <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-2xl transition-colors group cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="relative">
         <img src={`https://picsum.photos/seed/${name}/100/100`} alt={name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm" />
         <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      <div>
        <h5 className="text-sm font-bold text-slate-800">{name}</h5>
        <p className="text-xs text-slate-400 font-medium">{role}</p>
      </div>
    </div>
    <button className="flex items-center gap-1 text-xs text-slate-300 group-hover:text-purple-600 font-bold transition-colors">
       <UserPlus size={16} /> Follow
    </button>
  </div>
);

export default RightPanel;