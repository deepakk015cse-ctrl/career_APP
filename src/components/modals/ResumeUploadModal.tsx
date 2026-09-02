import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, Download, Trash2, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ResumeUploadModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { currentUser, updateResume } = useApp();

  const [fileName, setFileName] = useState(currentUser.resumeFileName || 'Arjun_Sharma_Resume_2025.pdf');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0].name;
      setFileName(selected);
      updateResume(selected);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Resume & CV Management</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          
          {/* Active resume card */}
          {currentUser.resumeFileName && (
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-indigo-600 text-white rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{currentUser.resumeFileName}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Uploaded • {currentUser.resumeUploadDate || 'Recently'}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md mt-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Indexed for Recruiter Search
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-slate-200 hover:border-indigo-500 rounded-2xl p-6 text-center transition-colors">
            <Upload className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
            <div className="text-xs font-bold text-slate-900">Upload new resume version</div>
            <p className="text-[11px] text-slate-500 mt-1">PDF or DOCX format (Max 10MB)</p>
            
            <label className="mt-4 inline-block px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer shadow-2xs transition-colors">
              <span>Choose File</span>
              <input
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={handleSimulatedUpload}
                className="hidden"
              />
            </label>
          </div>

          {isSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Resume updated and indexed successfully!</span>
            </div>
          )}

          {/* Extracted Highlights Teaser */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <h5 className="text-xs font-bold text-slate-800 mb-2">Auto-Extracted Skills & Metrics:</h5>
            <div className="flex flex-wrap gap-1.5">
              {['NIT Trichy CSE', 'Razorpay SDE Intern', '750+ LeetCode', 'Distributed Systems', 'Go / Golang', 'React / TypeScript', 'Raft Consensus'].map(k => (
                <span key={k} className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                  ✓ {k}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
