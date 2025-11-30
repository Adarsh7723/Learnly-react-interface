import React, { useState } from 'react';
import { X, Wand2, Loader2, ArrowRight } from 'lucide-react';
import { editCourseImage } from '../services/geminiService';

interface ImageEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalImage: string;
  onUpdateImage: (newImage: string) => void;
}

const ImageEditorModal: React.FC<ImageEditorModalProps> = ({ isOpen, onClose, originalImage, onUpdateImage }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      // For demo purposes, we need a real base64 image. 
      // Since picsum gives URLs, we'll fetch it and convert to base64 first.
      const fetchRes = await fetch(originalImage);
      const blob = await fetchRes.blob();
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        try {
            const result = await editCourseImage(base64data, prompt);
            if (result) {
                setGeneratedImage(result);
            }
        } catch (e) {
            alert("Failed to edit image. Try again.");
        } finally {
            setIsGenerating(false);
        }
      }
      reader.readAsDataURL(blob);

    } catch (error) {
      console.error(error);
      setIsGenerating(false);
    }
  };

  const handleApply = () => {
      if (generatedImage) {
          onUpdateImage(generatedImage);
          onClose();
          setGeneratedImage(null);
          setPrompt('');
      }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Wand2 className="text-purple-600" size={24} />
                AI Image Editor
              </h2>
              <p className="text-sm text-slate-400">Powered by Gemini 2.5 Flash Image (Nano Banana)</p>
          </div>
          <button onClick={onClose} className="hover:bg-slate-100 p-2 rounded-full transition-colors"><X /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Original */}
            <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Original</p>
                <div className="rounded-xl overflow-hidden border-2 border-slate-100 aspect-video relative group">
                    <img src={originalImage} alt="Original" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Generated */}
            <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Generated Result</p>
                <div className={`rounded-xl overflow-hidden border-2 ${generatedImage ? 'border-purple-200' : 'border-dashed border-slate-200'} aspect-video relative flex items-center justify-center bg-slate-50`}>
                    {isGenerating ? (
                        <div className="flex flex-col items-center gap-2 text-purple-600">
                            <Loader2 className="animate-spin" size={32} />
                            <span className="text-xs font-medium">Gemini is painting...</span>
                        </div>
                    ) : generatedImage ? (
                        <img src={generatedImage} alt="Generated" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-slate-400 text-sm">Preview will appear here</span>
                    )}
                </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
           <label className="block text-sm font-medium text-slate-700 mb-2">How should we change this image?</label>
           <div className="flex gap-2">
             <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Make it cyberpunk style, add a neon sign..."
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
             />
             <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors"
             >
                Generate
             </button>
           </div>
           {generatedImage && (
             <button 
                onClick={handleApply}
                className="w-full mt-4 bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
             >
                Apply New Image <ArrowRight size={18} />
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditorModal;