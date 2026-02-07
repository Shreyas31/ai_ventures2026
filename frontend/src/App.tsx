import React, { useState, ChangeEvent } from 'react';
import { Upload, FileText, Film, Loader2, CheckCircle, Sparkles, X } from 'lucide-react';

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(0); // 0: Idle, 1: OCR, 2: Scripting, 3: Done

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setStep(0);
    }
  };

  const handleGenerate = () => {
    setIsProcessing(true);
    
    // Fake timeline for the pitch
    setTimeout(() => setStep(1), 1000); // OCR stage
    setTimeout(() => setStep(2), 2500); // Scripting stage
    
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3); // Completed
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 selection:bg-indigo-100">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-xl w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] p-10 border border-white/20">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 mb-4 rotate-3 hover:rotate-0 transition-transform duration-300">
            <Film className="text-white w-7 h-7" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">TrailerForge</h1>
          <p className="text-slate-500 mt-2 font-medium">Elevate your manuscript into cinema</p>
        </div>

        {/* Dynamic State: Upload or Processing */}
        {!isProcessing && step !== 3 ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <label className="group relative flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-all duration-300">
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="p-4 bg-slate-50 rounded-full group-hover:scale-110 group-hover:bg-white transition-all duration-300">
                  <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-600" />
                </div>
                <div className="text-center">
                  <p className="text-slate-600 font-semibold text-lg">Drop your file here</p>
                  <p className="text-slate-400 text-sm">PDF or Image (Max 10MB)</p>
                </div>
              </div>
              <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
            </label>

            {selectedFile && (
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm animate-in zoom-in-95 duration-300">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <FileText className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-700 truncate w-48">{selectedFile.name}</p>
                    <p className="text-xs text-slate-400">{(selectedFile.size / 1024).toFixed(0)} KB</p>
                  </div>
                </div>
                <button onClick={() => setSelectedFile(null)} className="p-2 hover:bg-slate-50 rounded-full text-slate-300 hover:text-red-400 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Processing State Visualizer */
          <div className="py-8 space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="relative flex justify-center">
              <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-indigo-600 animate-pulse" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className={`flex items-center gap-3 transition-opacity ${step >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                <CheckCircle className={`w-5 h-5 ${step >= 1 ? 'text-emerald-500' : 'text-slate-300'}`} />
                <span className="text-sm font-semibold text-slate-700 tracking-wide">Reading manuscript with Vision AI...</span>
              </div>
              <div className={`flex items-center gap-3 transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                <CheckCircle className={`w-5 h-5 ${step >= 2 ? 'text-emerald-500' : 'text-slate-300'}`} />
                <span className="text-sm font-semibold text-slate-700 tracking-wide">Crafting cinematic director's cut...</span>
              </div>
              <div className={`flex items-center gap-3 transition-opacity ${step >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                <CheckCircle className={`w-5 h-5 ${step >= 3 ? 'text-emerald-500' : 'text-slate-300'}`} />
                <span className="text-sm font-semibold text-slate-700 tracking-wide">Finalizing 4K video render...</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Action Button */}
        <button
          onClick={handleGenerate}
          disabled={!selectedFile || isProcessing || step === 3}
          className="group relative w-full mt-8 overflow-hidden bg-slate-900 rounded-2xl py-4 font-bold text-white shadow-xl hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 transition-all active:scale-[0.98]"
        >
          <div className="relative flex items-center justify-center gap-2">
            {step === 3 ? <CheckCircle className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            <span>{step === 3 ? "Trailer Ready" : "Create Masterpiece"}</span>
          </div>
        </button>

        {step === 3 && (
            <button onClick={() => {setStep(0); setSelectedFile(null);}} className="w-full mt-4 text-slate-400 text-sm font-medium hover:text-indigo-600 transition-colors">
                Start over
            </button>
        )}
      </div>
    </div>
  );
}