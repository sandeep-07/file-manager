import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import FileComponent from "./Pages/FileComponent";
import HomePage from "./Pages/HomePage";
import FolderComponent from "./Pages/FolderComponent";
import Sidebar from "./Components/Sidebar";
import Modal from "./Components/Modal";
import Navbar from "./Components/Navbar";
import SearchComponent from "./Pages/SearchComponent";
import { changeFolder } from "./redux/actionCreators/currentFolderActionCreator";
import { GlobalType } from "./types/interfaces";

import "./App.css";

const App = () => {
  const navigatge = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state: GlobalType) => state.fileFolder);
  const [open, setOpen] = useState(false);

  const { rootFolderDetails, searchQuery } = useSelector(
    (state: GlobalType) => ({
      rootFolderDetails: state.fileFolder,
      searchQuery: state?.search?.query,
    })
  );

  useEffect(() => {
    if (searchQuery.length > 0) {
      dispatch(changeFolder("root"));
      navigatge("/");
    }
  }, [searchQuery]);

  return (
    <div className="app201AppComp">
      {open && <Modal setIsOpen={setOpen} />}
      <div className="app245Sidebar">
        <Sidebar data={data} />
      </div>
      <div className="app201Dashboard">
        <Navbar setIsOpen={setOpen} isOpen={open} />

        <Routes>
          {searchQuery?.length > 0 ? (
            <Route path="/" element={<SearchComponent />} />
          ) : (
            <Route
              path="/"
              element={<HomePage children={rootFolderDetails.children} />}
            />
          )}

          <Route path="/:folderId" element={<FolderComponent />} />
          <Route path="/file/:query/:fileId" element={<FileComponent />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
