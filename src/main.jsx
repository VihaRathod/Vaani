import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from "./AuthContext"; // Make sure path is correct
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'

// Components
import HomePage from './components/HomePage.jsx'
import LoggedInPage from './components/LoggedInPage.jsx' // This is your login component
import SignUpPage from './components/SignUpPage.jsx'
import ModuleContainer from './components/ModuleContainer.jsx'
import Profile from './components/Profile.jsx'
import Dictionary from './components/Dictionary.jsx'
import Lessons from './components/Lessons.jsx'
import LessonDetail from './components/LessonDetail.jsx'

// Auth wrapper
import PrivateRoute from "./PrivateRoute";
import SignLanguageSelector from './components/SignLanguageSelector.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/signup',
    element: <SignUpPage />
  },
  {
    path: '/login',
    element: <LoggedInPage /> // Using LoggedInPage component for login
  },
  {
    path: '/modules',
    element: (
      <PrivateRoute>
        <ModuleContainer />
      </PrivateRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    )
  },
  {
    path: '/dictionary',
    element: (
      <PrivateRoute>
        <Dictionary />
      </PrivateRoute>
    )
  },
  {
    path: "/lessons",
    element: (
      <PrivateRoute>
        <Lessons />
      </PrivateRoute>
    )
  },
  {
    path: "/lesson-details",
    element: (
      <PrivateRoute>
        <LessonDetail />
      </PrivateRoute>
    )
  },
  {
    path: "/lessons/:moduleId",
    element: (
      <PrivateRoute>
        <Lessons />
      </PrivateRoute>
    )
  },
  {
    path: "/lesson/:lessonId", 
    element: (
      <PrivateRoute>
        <LessonDetail />
      </PrivateRoute>
    )
  },
  {
    path:"/selector",
    element:<SignLanguageSelector></SignLanguageSelector>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)