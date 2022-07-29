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

  const handleCreateFile = () => {
    const data = {
      name: itemName,
      id: getUuid(),
      isFolder: false,
      children: [],
    };
    dispatch(createItem({ createInside: createInside, item: data }));
  };

  return (
    <>
      <div className="ml900DarkBG" onClick={() => setIsOpen(false)}>
        <div className="ml019Centered">
          <div className="ml287Modal">
            <div className=".ml100ModalHeader">
              <div className="ml222CloseBtn">
                <button
                  className="ml019CloseBtn"
                  onClick={() => setIsOpen(false)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <h2 className="ml001Heading">Create New</h2>
            </div>
            <div className="ml180FileOrFolder">
              <span
                onClick={() => setShouldCreateFile(0)}
                className={`ml094Btn ml291FolderButton ${
                  shouldCreateFile == 0 ? "ml129ActiveBtn" : ""
                }`}
              >
                Folder
              </span>
              <span
                onClick={() => setShouldCreateFile(1)}
                className={`ml094Btn ml294FileButton ${
                  shouldCreateFile == 1 ? "ml129ActiveBtn" : ""
                }`}
              >
                File
              </span>
            </div>
            <div className="ml291ModalContent">
              <input
                className="ml501ModalInput"
                placeholder="Name"
                onChange={(e) => setItemName(e.target.value)}
              />
              <br />
              <input
                className="ml501ModalInput"
                placeholder="Type"
                onChange={(e) => setType(e.target.value)}
              />
              <br />
              <input
                className="ml501ModalInput"
                placeholder="Creator"
                onChange={(e) => setCreatorName(e.target.value)}
              />
            </div>
            <div className="ml481ModalActions">
              <div className="ml978ActionsContainer">
                {shouldCreateFile == 1 ? (
                  <button onClick={handleCreateFile} className="ml012createBtn">
                    Create File
                  </button>
                ) : (
                  <button
                    onClick={handleCreateFolder}
                    className="ml012createBtn"
                  >
                    Create Folder
                  </button>
                )}
              </div>
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
