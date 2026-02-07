import React, { useState, ChangeEvent } from 'react';
import { Upload, FileText, Film, Sparkles, X, CheckCircle, Clapperboard, MessageSquare, Quote } from 'lucide-react';

// Define the shape of our AI response for TypeScript
interface TrailerScene {
  video_prompt: string;
  voiceover_script: string;
  mood: string;
}

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(0); // 0: Idle, 1: Processing, 3: Done
  const [scenes, setScenes] = useState<TrailerScene[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setStep(0);
      setScenes([]);
    }
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setStep(1); // Show processing UI

    // Prepare the file for the multipart/form-data request
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // API Call to your FastAPI backend
      const response = await fetch('http://localhost:8000/processing/generate-trailer', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error("Backend response failed");

      const data = await response.json();
      
      // data.scenes comes from your 'return {"scenes": scenes}' in FastAPI
      setScenes(data.scenes);
      setStep(3); // Mark as complete
    } catch (error) {
      console.error("Pipeline error:", error);
      alert("AI pipeline failed. Check if your backend is running!");
      setStep(0);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center p-4 md:p-12 selection:bg-indigo-100">
      {/* Background Decorative Blobs */}
      <div className="fixed top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="fixed top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Container */}
      <div className="relative max-w-2xl w-full">
        
        {/* Card Main */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] p-8 md:p-10 border border-white/20">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 mb-4 rotate-3">
              <Film className="text-white w-7 h-7" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">TrailerForge</h1>
            <p className="text-slate-500 mt-2 font-medium">Elevate your manuscript into cinema</p>
          </div>

          {/* Logic: Upload vs Processing */}
          {!isProcessing && step !== 3 ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <label className="group relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all duration-300">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="p-4 bg-slate-50 rounded-full group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                    <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-slate-600 font-semibold text-lg">Drop your book cover</p>
                    <p className="text-slate-400 text-sm">PNG, JPG, or PDF (Max 10MB)</p>
                  </div>
                </div>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
              </label>

              {selectedFile && (
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm animate-in zoom-in-95">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-700 truncate w-48">{selectedFile.name}</p>
                      <p className="text-xs text-slate-400">Ready for analysis</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedFile(null)} className="p-2 text-slate-300 hover:text-red-400 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ) : isProcessing ? (
            <div className="py-12 space-y-8 text-center animate-in fade-in zoom-in">
              <div className="relative flex justify-center">
                <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-indigo-600 animate-pulse" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800">Directing your trailer...</h3>
                <p className="text-slate-500 animate-pulse">Vision AI is reading and Gemini is scripting</p>
              </div>
            </div>
          ) : (
            /* Result State: Done */
            <div className="py-4 text-center animate-in fade-in zoom-in">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Script Complete</h3>
                <p className="text-slate-500">Your cinematic vision is ready for production</p>
              </div>
            </div>
          )}

          {/* Primary CTA Button */}
          <button
            onClick={handleGenerate}
            disabled={!selectedFile || isProcessing || step === 3}
            className="group relative w-full mt-8 overflow-hidden bg-slate-900 rounded-2xl py-4 font-bold text-white shadow-xl hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 transition-all active:scale-[0.98]"
          >
            <div className="relative flex items-center justify-center gap-2">
              {step === 3 ? <CheckCircle className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
              <span>{step === 3 ? "Trailer Generated" : "Create Masterpiece"}</span>
            </div>
          </button>
        </div>

        {/* RESULTS SECTION: The Storyboard */}
        {step === 3 && scenes.length > 0 && (
          <div className="mt-8 space-y-6 animate-in slide-in-from-bottom-10 fade-in duration-1000 fill-mode-both">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Director's Shot List</h2>
              <button onClick={() => {setStep(0); setSelectedFile(null);}} className="text-sm font-bold text-indigo-600 hover:text-indigo-700">
                New Project
              </button>
            </div>

            <div className="grid gap-6">
              {scenes.map((scene, index) => (
                <div key={index} className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                        {scene.mood}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="mt-1"><Clapperboard className="w-4 h-4 text-slate-400" /></div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Visual Prompt</p>
                        <p className="text-slate-700 leading-relaxed font-medium">{scene.video_prompt}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="mt-1"><Quote className="w-4 h-4 text-indigo-400" /></div>
                      <div>
                        <p className="text-xs font-bold text-indigo-400 uppercase mb-1">Voiceover Script</p>
                        <p className="text-slate-900 font-bold italic leading-relaxed text-lg">
                          "{scene.voiceover_script}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}