import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import ChatBot from './components/ChatBot';
import CourseCard from './components/CourseCard';
import ImageEditorModal from './components/ImageEditorModal';
import { Search, Bell, ChevronRight, PlayCircle, Lightbulb, Search as SearchIcon, Loader2 } from 'lucide-react';
import { generateStudyPlan, searchTopicInfo } from './services/geminiService';

// Mock Data
const INITIAL_COURSES = [
  { id: '1', category: 'FRONTEND', title: "Beginner's Guide to Becoming a Professional Front-End Developer", author: "Leonardo Samsul", image: "https://picsum.photos/400/250?random=10" },
  { id: '2', category: 'UI/UX DESIGN', title: "Optimizing User Experience with the Best UI/UX Design", author: "Bayu Salto", image: "https://picsum.photos/400/250?random=11" },
  { id: '3', category: 'BRANDING', title: "Reviving and Refreshing Company Image", author: "Padhang Satrio", image: "https://picsum.photos/400/250?random=12" },
];

const App: React.FC = () => {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{text: string, sources: any[]} | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isPlanning, setIsPlanning] = useState(false);
  const [planResult, setPlanResult] = useState<string | null>(null);

  const handleEditImage = (id: string) => {
    setEditingCourseId(id);
    setIsEditorOpen(true);
  };

  const handleUpdateImage = (newImage: string) => {
    setCourses(prev => prev.map(c => c.id === editingCourseId ? { ...c, image: newImage } : c));
  };

  const getEditingCourseImage = () => {
    return courses.find(c => c.id === editingCourseId)?.image || '';
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchResults(null);
    const result = await searchTopicInfo(searchQuery);
    setSearchResults(result);
    setIsSearching(false);
  };

  const handleThinkingMode = async () => {
    setIsPlanning(true);
    try {
        const result = await generateStudyPlan("Full Stack Development with AI Integration");
        setPlanResult(result);
    } catch(e) {
        setPlanResult("Failed to generate plan.");
    } finally {
        setIsPlanning(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F6FA] text-slate-800 font-sans">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 xl:mr-96 p-4 sm:p-8 overflow-x-hidden overflow-y-auto scrollbar-hide">
        
        {/* Top Bar */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <form onSubmit={handleSearch} className="relative w-full sm:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors" size={20} />
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search your course or topic..." 
                    className="w-full pl-12 pr-4 py-3.5 bg-white border-none rounded-2xl shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-600/20 placeholder:text-slate-400 transition-all"
                />
                {isSearching && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-purple-600" size={18}/>}
            </form>
            
            {/* Mobile Profile/Notify (Hidden on XL as it's in RightPanel) */}
            <div className="flex items-center gap-4 xl:hidden self-end">
                <button className="p-2 bg-white rounded-full shadow-sm text-slate-500"><Bell size={20}/></button>
                <img src="https://picsum.photos/100/100?random=99" className="w-10 h-10 rounded-full" alt="Profile" />
            </div>
        </header>

        {/* Search Results Area (Grounding) */}
        {searchResults && (
            <div className="mb-8 p-6 bg-white rounded-3xl shadow-sm border border-slate-100 animate-in fade-in slide-in-from-top-4">
                <div className="flex items-center gap-2 mb-3">
                    <SearchIcon size={20} className="text-purple-600" />
                    <h3 className="font-bold text-lg">Search Insights</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{searchResults.text}</p>
                {searchResults.sources.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-400 uppercase">Sources</p>
                        <div className="flex flex-wrap gap-2">
                            {searchResults.sources.map((chunk, idx) => (
                                chunk.web?.uri && (
                                <a key={idx} href={chunk.web.uri} target="_blank" rel="noreferrer" className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-100 truncate max-w-xs block">
                                    {chunk.web.title || chunk.web.uri}
                                </a>
                                )
                            ))}
                        </div>
                    </div>
                )}
                <button onClick={() => setSearchResults(null)} className="mt-4 text-xs text-slate-400 hover:text-slate-600 underline">Close Results</button>
            </div>
        )}

        {/* Hero Section */}
        <div className="relative w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-[2rem] p-8 sm:p-12 mb-8 overflow-hidden shadow-lg shadow-purple-200">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-20 w-32 h-32 bg-purple-400/30 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 max-w-lg">
                <p className="text-purple-200 text-sm font-semibold tracking-wider mb-2 uppercase">Online Course</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                    Sharpen Your Skills with Professional Online Courses
                </h2>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-black transition-transform hover:scale-105">
                      Join Now <ChevronRight size={18} />
                  </button>
                  <button 
                    onClick={handleThinkingMode}
                    className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white/30 transition-transform"
                  >
                      {isPlanning ? <Loader2 className="animate-spin" size={18}/> : <Lightbulb size={18}/>}
                      {isPlanning ? "Thinking..." : "AI Study Plan"}
                  </button>
                </div>
                
                {/* Thinking Mode Output */}
                {planResult && (
                    <div className="mt-6 bg-white/95 text-slate-800 p-6 rounded-2xl max-h-60 overflow-y-auto shadow-xl">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold flex items-center gap-2 text-purple-600"><Lightbulb size={16}/> Suggested Plan</h4>
                            <button onClick={() => setPlanResult(null)} className="text-xs text-slate-500 hover:text-red-500">Close</button>
                        </div>
                        <div className="prose prose-sm prose-purple">
                            <p className="whitespace-pre-wrap text-sm">{planResult}</p>
                        </div>
                    </div>
                )}
            </div>
            {/* Abstract Star shape */}
            <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden md:block opacity-30">
                 <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                 </svg>
            </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <StatCard label="UI/UX Design" progress="2/8 watched" color="text-purple-600" bg="bg-purple-100" />
            <StatCard label="Branding" progress="3/8 watched" color="text-pink-600" bg="bg-pink-100" />
            <StatCard label="Front End" progress="6/12 watched" color="text-blue-600" bg="bg-blue-100" />
        </div>

        {/* Continue Watching Section */}
        <div className="mb-10">
            <div className="flex justify-between items-end mb-6">
                <h3 className="text-xl font-bold text-slate-800">Continue Watching</h3>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"><ChevronRight className="rotate-180" size={20}/></button>
                    <button className="p-2 bg-purple-600 text-white rounded-full shadow-md shadow-purple-200 hover:bg-purple-700 transition-colors"><ChevronRight size={20}/></button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <CourseCard 
                        key={course.id}
                        {...course}
                        onEditImage={() => handleEditImage(course.id)}
                    />
                ))}
            </div>
        </div>

        {/* Your Lesson Section */}
        <div>
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">Your Lesson</h3>
                <button className="text-sm font-bold text-purple-600 hover:underline">See all</button>
            </div>
            
            <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100">
                <div className="hidden sm:grid grid-cols-12 gap-4 p-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 mb-2">
                    <div className="col-span-4">Mentor</div>
                    <div className="col-span-3">Type</div>
                    <div className="col-span-4">Desc</div>
                    <div className="col-span-1 text-center">Action</div>
                </div>
                <LessonRow 
                    mentor="Padhang Satrio" 
                    date="2/16/2004" 
                    type="UI/UX DESIGN" 
                    desc="Understand of UI/UX Design" 
                    img="https://picsum.photos/seed/Padhang/50/50"
                />
                 <LessonRow 
                    mentor="Leonardo Samsul" 
                    date="2/20/2004" 
                    type="FRONTEND" 
                    desc="Introduction to React Hooks" 
                    img="https://picsum.photos/seed/Leonardo/50/50"
                />
            </div>
        </div>

      </main>

      {/* Right Panel (Desktop XL only) */}
      <RightPanel />

      {/* Floating Chat */}
      <ChatBot />

      {/* Image Editor Modal */}
      <ImageEditorModal 
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        originalImage={getEditingCourseImage()}
        onUpdateImage={handleUpdateImage}
      />
    </div>
  );
};

// Sub-components for specific sections
const StatCard: React.FC<{ label: string; progress: string; color: string; bg: string }> = ({ label, progress, color, bg }) => (
    <div className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg} ${color}`}>
                 <div className="font-bold text-lg">%</div>
            </div>
            <div>
                <p className="text-xs text-slate-400 font-medium mb-1">{progress}</p>
                <h4 className="font-bold text-slate-800">{label}</h4>
            </div>
        </div>
        <button className="text-slate-300 hover:text-slate-600"><MoreVerticalDot /></button>
    </div>
);

const LessonRow: React.FC<{ mentor: string; date: string; type: string; desc: string; img: string }> = ({ mentor, date, type, desc, img }) => (
    <div className="flex flex-col sm:grid sm:grid-cols-12 gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors items-center group">
        <div className="col-span-4 flex items-center gap-3 w-full">
            <img src={img} alt={mentor} className="w-10 h-10 rounded-full object-cover" />
            <div>
                <h5 className="font-bold text-slate-800 text-sm">{mentor}</h5>
                <p className="text-xs text-slate-400">{date}</p>
            </div>
        </div>
        <div className="col-span-3 w-full sm:w-auto">
             <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide">
                {type}
             </span>
        </div>
        <div className="col-span-4 w-full text-sm font-semibold text-slate-700">
            {desc}
        </div>
        <div className="col-span-1 flex justify-center w-full sm:w-auto">
            <button className="text-slate-300 hover:text-purple-600 group-hover:scale-110 transition-transform">
                <PlayCircle size={24} />
            </button>
        </div>
    </div>
);

const MoreVerticalDot = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
    </svg>
);

export default App;