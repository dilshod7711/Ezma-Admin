import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Books from "./pages/Books/Books";
import Libraries from "./pages/Libraries/Libraries";
import Profile from "./pages/Profile/Profile";
import PrivateRequset from "./components/privateRequest/PrivateRequset";
import Login from "./pages/Auth/login/Login";
import Register from "./pages/Auth/register/Register";
import BookDetail from "./pages/Books/bookDetail/BookDetail";
import LibDetail from "./pages/Libraries/librariesDetail/LibDetail";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRequset />}>
          <Route element={<Layout />}>
            <Route path="/books" element={<Books />} />
            <Route path="/booksDetail/:id" element={<BookDetail />} />
            <Route path="/libraries" element={<Libraries />} />
            <Route path="/librariessDetail/:id" element={<LibDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
