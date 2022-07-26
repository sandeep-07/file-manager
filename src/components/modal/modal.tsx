import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../../redux/actionCreators/fileFolderActionCreators";
import { getUuid } from "../../utils/getUuid";
import "./modal.css";

const Modal = ({ setIsOpen }: props) => {
  const [shouldCreateFile, setShouldCreateFile] = useState(0);
  const [itemName, setItemName] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [type, setType] = useState("");
  const createInside = useSelector((state: any) => state.currentFolder);
  const dispatch = useDispatch();

  const handleCreateFolder = () => {
    const data = {
      name: itemName,
      id: getUuid(),
      isFolder: true,
      children: [],
    };

    dispatch(createItem({ createInside: createInside, item: data }));
  };

  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h2 className="heading">Create New</h2>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="fileOrFolder">
            <span
              onClick={() => setShouldCreateFile(0)}
              className={`btn fileButton ${
                shouldCreateFile == 0 ? "activeBtn" : ""
              }`}
            >
              Folder
            </span>
            <span
              onClick={() => setShouldCreateFile(1)}
              className={`btn folderButton ${
                shouldCreateFile == 1 ? "activeBtn" : ""
              }`}
            >
              File
            </span>
          </div>
          <div className="modalContent">
            <input
              className="modalInput"
              placeholder="Name"
              onChange={(e) => setItemName(e.target.value)}
            />
            <br />
            <input
              className="modalInput"
              placeholder="Type"
              onChange={(e) => setType(e.target.value)}
            />
            <br />
            <input
              className="modalInput"
              placeholder="Creator"
              onChange={(e) => setCreatorName(e.target.value)}
            />
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              {shouldCreateFile == 1 ? (
                <button className="createBtn">Create File</button>
              ) : (
                <button onClick={handleCreateFolder} className="createBtn">
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
