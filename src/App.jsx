import React from "react";
import ProjectForm from "./pages/Task1/ProjectForm";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import AccountForm from "./pages/Task2/AccountForm";

const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<ProjectForm />} />
        <Route path="/task2" element={<AccountForm />} />
      </Routes>
    </>
  );
};

export default App;
