import React from "react";
import MainLayout from "../layouts/MainLayout/MainLayout";
import HomePage from "../modules/home/HomePage/HomePage";
import MovieDetails from "../modules/home/MovieDetails/MovieDetails";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import LoginPage from "../modules/auth/LoginPage/LoginPage";
import RegisterPage from "../modules/auth/RegisterPage/RegisterPage";
import { useRoutes } from "react-router-dom";
import PATH from "./path";

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
  ]);
  return elements;
}
