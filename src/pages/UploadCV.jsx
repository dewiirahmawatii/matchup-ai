import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UploadCV() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Timer references for unmount cleanup
  const uploadIntervalRef = useRef(null);
  const uploadTimeoutRef = useRef(null);

  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Clean up timers when component unmounts
  useEffect(() => {
    return () => {
      if (uploadIntervalRef.current) clearInterval(uploadIntervalRef.current);
      if (uploadTimeoutRef.current) clearTimeout(uploadTimeoutRef.current);
    };
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const startUploadSim = (name) => {
    setErrorMessage('');
    setFileName(name);
    setUploading(true);
    setIsSuccess(false);
    setProgress(0);

    if (uploadIntervalRef.current) clearInterval(uploadIntervalRef.current);
    if (uploadTimeoutRef.current) clearTimeout(uploadTimeoutRef.current);

    uploadIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadIntervalRef.current);
          setIsSuccess(true);
          // Persist the state in localStorage
          localStorage.setItem('hasUploadedCV', 'true');
          
          // Hold the success screen for 1.5 seconds before navigating
          uploadTimeoutRef.current = setTimeout(() => {
            navigate('/ai-analysis');
          }, 1500);
          
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const validateAndUpload = (file) => {
    if (!file) return;
    
    // Restrict strictly to PDF files
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMessage('Please upload a PDF file only.');
      return;
    }

    startUploadSim(file.name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndUpload(e.target.files[0]);
    }
  };

  const triggerBrowse = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex-1 flex flex-col relative pb-24">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-50 w-full flex justify-between items-center px-5 py-3 bg-surface/80 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)} 
            className="material-symbols-outlined text-on-surface-variant hover:bg-primary-container/20 p-2 rounded-full transition-colors active:scale-95"
          >
            arrow_back
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">MatchUp AI</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary p-2 hover:bg-primary-container/20 rounded-full transition-colors cursor-pointer">notifications</span>
          <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant overflow-hidden">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8EBpeQTbq4o-Rr3_2-koldhoXOIgMKCzXdON3bHeDoifr6BFwl9wjJgzf7f_jfXXVlPAEy-V3eGNnNcqd0phU9f1fmh5_SnN_W3J9T_EWBlzuOWN0EWxtvc8JThP3lDCi5KdVe25JCIRZRwZkkR6vD1TVJmxgloTwOPvWEF3eXYzLjA5EyrU96AzrVIREzJuUHQ3K3C071CxeeP-lbVk6QCIKmCZCHjNMtG1myHvKNGqfG8Ney9fR" alt="Avatar" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center px-margin-mobile py-8 w-full">
        {/* Header Section */}
        <section className="text-center mb-10 w-full max-w-2xl animate-fade-in">
          <h2 className="font-headline-lg text-[28px] font-semibold text-on-surface mb-3">Complete Your Profile</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Upload your CV to let our AI scan your skills and match you with the perfect career opportunities.</p>
        </section>

        {/* AI Callout Component */}
        <div className="w-full max-w-xl mb-8 p-4 rounded-xl bg-primary-container/10 border border-primary/20 flex items-start gap-4 animate-fade-in">
          <div className="bg-primary p-2 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary ai-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <div>
            <h4 className="font-title-md text-title-md text-primary mb-1">AI Matching Engine</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant">MatchUp AI will analyze your profile to find the best match based on your unique experience, skills, and industry trends.</p>
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="w-full max-w-xl mb-6 p-4 rounded-xl bg-error-container text-on-error-container border border-error/25 flex items-center gap-3 animate-fade-in">
            <span className="material-symbols-outlined text-error">error</span>
            <span className="font-label-sm text-label-sm">{errorMessage}</span>
          </div>
        )}

        {/* Main Upload Zone */}
        {!uploading ? (
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerBrowse}
            className={`w-full max-w-xl bg-white border-2 border-dashed rounded-[32px] p-10 mb-8 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer group shadow-sm ${
              isDragOver ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-outline-variant hover:border-primary'
            }`}
          >
            <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-container/10 transition-colors">
              <span className="material-symbols-outlined text-4xl text-outline group-hover:text-primary transition-colors">cloud_upload</span>
            </div>
            <h3 className="font-title-md text-title-md text-on-surface mb-2">Drag and drop your CV</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">PDF files only (Max 5MB)</p>
            <button className="bg-primary text-on-primary font-title-md py-3 px-8 rounded-full hover:shadow-lg active:scale-95 transition-all">Browse Files</button>
            <input 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf" 
              className="hidden" 
              type="file"
            />
          </div>
        ) : (
          <div className="w-full max-w-xl bg-white border border-outline-variant rounded-[32px] p-10 mb-8 flex flex-col items-center justify-center shadow-sm">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 border border-green-200">
                  <span className="material-symbols-outlined text-4xl text-green-600">check_circle</span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface mb-2">Upload Successful!</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4 truncate max-w-xs">{fileName}</p>
                <p className="font-label-sm text-label-sm text-primary font-semibold">Redirecting to AI Analysis...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center w-full">
                <div className="w-20 h-20 bg-primary-container/10 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-4xl text-primary ai-pulse">sync</span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface mb-2">Analyzing Resume...</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 truncate max-w-xs">{fileName}</p>
                
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mb-3">
                  <div 
                    className="bg-primary h-full rounded-full transition-all duration-150" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-semibold">{progress}%</span>
              </div>
            )}
          </div>
        )}

        {/* Integration Row */}
        <div className="w-full max-w-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-grow h-px bg-outline-variant/30"></div>
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">Or Sync From</span>
            <div className="flex-grow h-px bg-outline-variant/30"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => startUploadSim('linked_profile.pdf')} className="flex items-center justify-center gap-3 py-4 border border-outline-variant rounded-2xl hover:bg-surface-container-low transition-colors font-title-md text-on-surface active:scale-95">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" fill="#0077B5"></path>
                <path d="M7.75 18.25V9H10.5V18.25H7.75ZM9.125 7.875C8.24134 7.875 7.525 7.15866 7.525 6.275C7.525 5.39134 8.24134 4.675 9.125 4.675C10.0087 4.675 10.725 5.39134 10.725 6.275C10.725 7.15866 10.0087 7.875 9.125 7.875ZM12.25 18.25H15V13.5C15 12.3 14.8 11.1 16.3 11.1C17.8 11.1 17.8 12.5 17.8 13.6V18.25H20.5V13.3C20.5 10.8 19.9 8.8 17.1 8.8C15.7 8.8 14.8 9.6 14.4 10.3H14.3V9.1H11.7C11.7 9.8 11.7 18.25 11.7 18.25H12.25V18.25Z" fill="white"></path>
              </svg>
              <span>LinkedIn</span>
            </button>
            <button onClick={() => startUploadSim('resume_drive.pdf')} className="flex items-center justify-center gap-3 py-4 border border-outline-variant rounded-2xl hover:bg-surface-container-low transition-colors font-title-md text-on-surface active:scale-95">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.75 4L2 14L4.87 19H16.37L22 9L19.12 4H7.75Z" fill="#FFC107"></path>
                <path d="M16.37 19L19.12 14L10.5 14L7.75 19H16.37Z" fill="#1976D2"></path>
                <path d="M7.75 4L4.87 9L13.5 9L16.37 4H7.75Z" fill="#4CAF50"></path>
              </svg>
              <span>Google Drive</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
