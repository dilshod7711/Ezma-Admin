import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Books from "./pages/Books/Books";
import Libraries from "./pages/Libraries/Libraries";
import Profile from "./pages/Profile/Profile";
import PrivateRequset from "./components/privateRequest/PrivateRequset";
import Login from "./pages/Auth/login/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRequset />}>
          <Route element={<Layout />}>
            <Route path="/books" element={<Books />} />
            <Route path="/libraries" element={<Libraries />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
