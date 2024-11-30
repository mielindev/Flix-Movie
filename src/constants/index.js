import PATH from "../routes/path";

export const BASE_LINK = "https://movienew.cybersoft.edu.vn/api/";
export const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3MiIsIkhldEhhblN0cmluZyI6IjI2LzA0LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NTYyNTYwMDAwMCIsIm5iZiI6MTcxODAzODgwMCwiZXhwIjoxNzQ1NzczMjAwfQ.dB37yIT7JCR8-a4XuqTFyZfc5Mr5r0V5icCjUZrxFnI";

export const drawerWidth = 250;

export const slidebarContent = [
  {
    context: "Dashboard",
    local: PATH.ADMIN,
  },
  {
    context: "User Management",
    local: PATH.USER_MANAGEMENT,
  },
  {
    context: "Movie Management",
    local: PATH.MOVIE_MANAGEMENT,
  },
];
