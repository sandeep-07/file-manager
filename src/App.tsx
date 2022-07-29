import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Sidebar from "./components/sidebar/sidebar";
import { createItem } from "./redux/actionCreators/fileFolderActionCreators";
import "./App.css";
import HomePage from "./pages/homePage/homePage";
import FolderComponent from "./pages/folderComponent/folderComponent";
import Modal from "./components/modal/modal";
import Navbar from "./components/navbar/navbar";
import FileComponent from "./pages/fileComponent/fileComponent";
function App() {
  const [isOpen, setIsOpen] = useState(false);

  const data = useSelector((state: any) => state.fileFolder);
  return (
    <div className="app201AppComp">
      <div className="app245Sidebar">
        <Sidebar data={data} />
      </div>
      <div className="app292Dashboard">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:folderId" element={<FolderComponent />} />
          <Route path="/file/:query/:fileId" element={<FileComponent />} />
        </Routes>
        <button onClick={() => setIsOpen(true)} style={{ marginTop: 50 }}>
          Open Modal
        </button>
        {isOpen && <Modal setIsOpen={setIsOpen} />}
      </div>
    </div>
  );
}

export default App;
