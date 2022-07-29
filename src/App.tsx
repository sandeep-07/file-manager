import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import FileComponent from "./pages/fileComponent/fileComponent";
import HomePage from "./pages/homePage/homePage";
import FolderComponent from "./pages/folderComponent/folderComponent";
import Sidebar from "./components/sidebar/sidebar";
import Modal from "./components/modal/modal";
import Navbar from "./components/navbar/navbar";

import "./App.css";



const App = () => {
  const data = useSelector((state: any) => state.fileFolder);
  const [open, setOpen] = useState(false);

  return (
    <div className="app201AppComp">
      {open && <Modal setIsOpen={setOpen} />}
      <div className="app245Sidebar">
        <Sidebar data={data} />
      </div>
      <div className="app292Dashboard">
        <Navbar setIsOpen={setOpen} isOpen={open} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:folderId" element={<FolderComponent />} />
          <Route path="/file/:query/:fileId" element={<FileComponent />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
