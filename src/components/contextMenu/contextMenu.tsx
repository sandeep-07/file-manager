import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeFolder } from "../../redux/actionCreators/currentFolderActionCreator";

import { deleteItem } from "../../redux/actionCreators/fileFolderActionCreators";
import { DataType } from "../../types/interfaces";

import "./contextMenu.css";

const ContextMenu = ({
  cordinates,
  item,
  setOpen,
  setShowDetailsOfItem,
  setOpenDetails,
}: propTypes) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = item;

  const handleDeleteClick = () => {
    if (item.isAdmin) {
      alert("You can't delete admin folder");
      return;
    }
    dispatch(deleteItem(id));
  };

  const handleShowDetails = () => {
    setOpenDetails(true);
    setShowDetailsOfItem(item);
  };

  const handleOpen = () => {
    if (!item.isFolder) {
      navigate(`/file/${item.name}/${id}`);
      return;
    }
    dispatch(changeFolder(id));
    navigate(`/${id}`);
  };

  return (
    <div
      style={{ top: cordinates.y, left: cordinates.x }}
      className="cm901Menu"
      onClick={() => setOpen(false)}
    >
      <div className="cm241MenuItem" onClick={handleOpen}>
        Open
      </div>
      <div className="cm241MenuItem" onClick={handleShowDetails}>
        Show Details
      </div>
      <div onClick={handleDeleteClick} className="cm241MenuItem">
        Delete
      </div>
    </div>
  );
};

type propTypes = {
  cordinates: { x: number; y: number };
  item: DataType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDetailsOfItem: React.Dispatch<React.SetStateAction<DataType>>;
  setOpenDetails: React.Dispatch<React.SetStateAction<boolean>>;
};

export default ContextMenu;
