import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import Edit from '../pages/Edit';

const Home = lazy(() => import('../pages/Home'));
const Study = lazy(() => import('../pages/Study'));
const Teacher = lazy(() => import('../pages/Teacher'));
const TeacherList = lazy(() => import('../pages/TeacherList'));
const Login = lazy(() => import('../pages/login'));
const Profile = lazy(() => import('../pages/Profile'));
const UpdatePassword = lazy(() => import('../pages/updatePassword'));

const Routers = () => {
  const [isLoadingHome, setIsLoadingHome] = useState(true);
  const [isLoadingStudy, setIsLoadingStudy] = useState(true);
  const [isLoadingTeacher, setIsLoadingTeacher] = useState(true);
  const [isLoadingTeacherList, setIsLoadingTeacherList] = useState(true);
  const [isLoadinglogin, setIsLoadinglogin] = useState(true);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (location.pathname === '/home') {
        setIsLoadingHome(false);
      } else if (location.pathname === '/study') {
        setIsLoadingStudy(false);
      } else if (location.pathname === '/teacher') {
        setIsLoadingTeacher(false);
      } else if (location.pathname === '/teacherlist') {
        setIsLoadingTeacherList(false);
      } else if (location.pathname === '/login') {
        setIsLoadinglogin(false);
      } else if (location.pathname === '/profile') {
        setIsLoadingProfile(false);
      } 
    }, 2000);
    return () => clearTimeout(delay);
  }, [location.pathname]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route 
          path="/" 
          element={<Navigate to="home" />} />
        <Route
          path="home"
          element={<Suspense fallback={<Loading />}>{isLoadingHome ? <Loading /> : <Home />}</Suspense>} />
        <Route
          path="study"
          element={<Suspense fallback={<Loading />}>{isLoadingStudy ? <Loading /> : <Study />}</Suspense>} />
        <Route
          path="teacher"
          element={<Suspense fallback={<Loading />}>{isLoadingTeacher ? <Loading /> : <Teacher />}</Suspense>} />
        <Route
          path="teacherlist"
          element={<Suspense fallback={<Loading />}>{isLoadingTeacherList ? <Loading /> : <TeacherList />}</Suspense>} />
        <Route
          path="login"
          element={<Suspense fallback={<Loading />}>{isLoadinglogin ? <Loading /> : <Login />}</Suspense>} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="/profile/:id/update-password" element={<UpdatePassword />} />
        <Route path="/profile/:id/edit" element={<Edit />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
