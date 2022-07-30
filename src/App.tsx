import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";

import FileComponent from "./pages/fileComponent/fileComponent";
import HomePage from "./pages/homePage/homePage";
import FolderComponent from "./pages/folderComponent/folderComponent";
import Sidebar from "./components/sidebar/sidebar";
import Modal from "./components/modal/modal";
import Navbar from "./components/navbar/navbar";
import SearchComponent from "./pages/searchComponent/searchComponent";

import "./App.css";
import { globalType } from "./types/interfaces";
import { changeFolder } from "./redux/actionCreators/currentFolderActionCreator";
import DetailsModal from "./components/detailsModal/detailsModal";

const App = () => {
  const data = useSelector((state: any) => state.fileFolder);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const searchQuery = useSelector((state: any) => state?.search?.query);
  const { rootFolderDetails } = useSelector((state: globalType) => ({
    rootFolderDetails: state.fileFolder,
  }));
  const navigatge = useNavigate();
  useEffect(() => {
    if (searchQuery.length > 0) {
      dispatch(changeFolder("root"));
      navigatge("/file-manager");
    }
  }, [searchQuery]);
  return (
    <div className="app201AppComp">
      {open && <Modal setIsOpen={setOpen} />}
      {/* {openDetails && <DetailsModal setIsOpen={setOpenDetails} />} */}
      <div className="app245Sidebar">
        <Sidebar data={data} />
      </div>
      <div className="app292Dashboard">
        <Navbar setIsOpen={setOpen} isOpen={open} />

        <Routes>
          {searchQuery?.length > 0 ? (
            <Route path="file-manager/" element={<SearchComponent />} />
          ) : (
            <Route
              path="file-manager/"
              element={<HomePage children={rootFolderDetails.children} />}
            />
          )}

          <Route path="file-manager/:folderId" element={<FolderComponent />} />
          <Route
            path="file-manager/file/:query/:fileId"
            element={<FileComponent />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
