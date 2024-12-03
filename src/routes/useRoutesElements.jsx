import React from "react";
import MainLayout from "../layouts/MainLayout/MainLayout";
import HomePage from "../modules/home/HomePage/HomePage";
import MovieDetails from "../modules/home/MovieDetails/MovieDetails";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import LoginPage from "../modules/auth/LoginPage/LoginPage";
import RegisterPage from "../modules/auth/RegisterPage/RegisterPage";
import { useRoutes } from "react-router-dom";
import PATH from "./path";
import AdminPage from "../modules/admin/AdminPage/AdminPage";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import UserManagement from "../modules/admin/UserManagement/UserManagement";
import MovieManagement from "../modules/admin/MovieManagement/MovieManagement";
import PurchasePage from "../modules/home/PurchasePage/PurchasePage";
import ProfilePage from "../modules/home/ProfilePage/ProfilePage";

export default function useRoutesElements() {
  const elements = useRoutes([
    {
      path: PATH.HOME,
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: PATH.MOVIE_DETAILS,
          element: <MovieDetails />,
        },
        {
          path: PATH.PURCHASE,
          element: <PurchasePage />,
        },
        {
          path: PATH.PROFILE,
          element: <ProfilePage />,
        },
      ],
    },
    {
      path: PATH.AUTH,
      element: <AuthLayout />,
      children: [
        {
          path: PATH.LOGIN,
          element: <LoginPage />,
        },
        {
          path: PATH.REGISTER,
          element: <RegisterPage />,
        },
      ],
    },
    {
      path: PATH.ADMIN,
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <AdminPage />,
        },
        {
          path: PATH.USER_MANAGEMENT,
          element: <UserManagement />,
        },
        {
          path: PATH.MOVIE_MANAGEMENT,
          element: <MovieManagement />,
        },
      ],
    },
  ]);
  return elements;
}
