import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../../redux/actionCreators/fileFolderActionCreators";
import { GlobalType } from "../../types/interfaces";
import { getUuid } from "../../utils/getUuid";

import "./modal.css";

const Modal = ({ setIsOpen }: props) => {
  const dispatch = useDispatch();
  const createInside = useSelector((state: GlobalType) => state.currentFolder);
  const [shouldCreateFile, setShouldCreateFile] = useState(0);
  const [itemName, setItemName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [type, setType] = useState("");

  const handleCreateFolder = () => {
    if (itemName.length === 0) {
      alert("Please enter a name");
      return;
    }

    const data = {
      name: itemName,
      id: getUuid(),
      isFolder: true,
      children: [],
      type: type,
      creator: creatorName,
      createdAt: new Date().toLocaleDateString(),
    };

    dispatch(createItem({ createInside: createInside, item: data }));
    setIsOpen(false);
  };

  const handleCreateFile = () => {
    if (itemName.length === 0) {
      alert("Please enter a name");
      return;
    }

    const data = {
      name: itemName,
      id: getUuid(),
      isFolder: false,
      children: [],
      creator: creatorName,
      type: type,
      createdAt: new Date().toLocaleDateString(),
    };

    dispatch(createItem({ createInside: createInside, item: data }));

    setIsOpen(false);
  };

  return (
    <>
      <div className="ml900DarkBG" onClick={() => setIsOpen(false)} />
      <div className="ml900Centered">
        <div className="ml900Modal">
          <div className=".ml900ModalHeader">
            <div className="ml900CloseBtn">
              <button
                className="ml900CloseBtn"
                onClick={() => setIsOpen(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <h2 className="ml900Heading">Create New</h2>
          </div>
          <div className="ml900FileOrFolder">
            <span
              onClick={() => setShouldCreateFile(0)}
              className={`ml900Btn ml900FolderButton ${
                shouldCreateFile == 0 ? "ml900ActiveBtn" : ""
              }`}
            >
              Folder
            </span>
            <span
              onClick={() => setShouldCreateFile(1)}
              className={`ml900Btn ml900FileButton ${
                shouldCreateFile == 1 ? "ml900ActiveBtn" : ""
              }`}
            >
              File
            </span>
          </div>
          <div className="ml900ModalContent">
            <input
              autoFocus
              className="ml900ModalInput"
              placeholder="Name"
              onChange={(e) => setItemName(e.target.value)}
            />
            <br />
            <input
              className="ml900ModalInput"
              placeholder="Type"
              onChange={(e) => setType(e.target.value)}
            />
            <br />
            <input
              className="ml900ModalInput"
              placeholder="Creator"
              onChange={(e) => setCreatorName(e.target.value)}
            />
          </div>
          <div className="ml900ModalActions">
            <div className="ml900ActionsContainer">
              {shouldCreateFile == 1 ? (
                <button onClick={handleCreateFile} className="ml900createBtn">
                  Create File
                </button>
              ) : (
                <button onClick={handleCreateFolder} className="ml900createBtn">
                  Create Folder
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default Modal;
