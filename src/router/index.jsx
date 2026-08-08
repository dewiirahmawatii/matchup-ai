import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Splash from '../pages/Splash';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import CompleteProfile from '../pages/CompleteProfile';
import UploadCV from '../pages/UploadCV';
import AICVAnalysis from '../pages/AICVAnalysis';
import Dashboard from '../pages/Dashboard';
import Jobs from '../pages/Jobs';
import JobDetail from '../pages/JobDetail';
import SkillGap from '../pages/SkillGap';
import CareerRoadmap from '../pages/CareerRoadmap';
import SavedJobs from '../pages/SavedJobs';
import Profile from '../pages/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Splash /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'complete-profile', element: <CompleteProfile /> },
      { path: 'upload-cv', element: <UploadCV /> },
      { path: 'ai-analysis', element: <AICVAnalysis /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'jobs', element: <Jobs /> },
      { path: 'job-detail/:id', element: <JobDetail /> },
      { path: 'skill-gap', element: <SkillGap /> },
      { path: 'roadmap', element: <CareerRoadmap /> },
      { path: 'saved-jobs', element: <SavedJobs /> },
      { path: 'profile', element: <Profile /> },
      { path: '*', element: <Navigate to="/dashboard" replace /> }
    ]
  }
]);
