import React from 'react';
import { Heart, Edit2 } from 'lucide-react';

interface CourseCardProps {
  category: string;
  title: string;
  author: string;
  image: string;
  onEditImage: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ category, title, author, image, onEditImage }) => {
  return (
    <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
      <div className="relative mb-4 h-32 rounded-2xl overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEditImage(); }}
            className="absolute top-2 right-2 p-1.5 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-purple-600 transition-colors opacity-0 group-hover:opacity-100"
            title="Edit with AI"
        >
            <Edit2 size={14} />
        </button>
        <button className="absolute top-2 left-2 p-1.5 bg-black/10 backdrop-blur-sm rounded-full text-white/80 hover:text-white">
             <Heart size={14} fill="currentColor" className="opacity-80" />
        </button>
      </div>
      <div className="flex items-center gap-2 mb-2">
         <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide
            ${category === 'FRONTEND' ? 'bg-blue-50 text-blue-600' : 
              category === 'UI/UX DESIGN' ? 'bg-purple-50 text-purple-600' : 
              'bg-pink-50 text-pink-600'}`}>
            {category}
         </span>
      </div>
      <h3 className="font-bold text-slate-800 text-sm mb-1 line-clamp-2 leading-tight h-10">{title}</h3>
      <div className="flex items-center gap-2 mt-3">
         <img src={`https://picsum.photos/seed/${author}/50/50`} alt={author} className="w-6 h-6 rounded-full" />
         <div>
            <p className="text-xs font-semibold text-slate-700">{author}</p>
            <p className="text-[10px] text-slate-400">Mentor</p>
         </div>
      </div>
    </div>
  );
};

export default CourseCard;