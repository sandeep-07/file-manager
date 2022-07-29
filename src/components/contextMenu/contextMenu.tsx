import { useDispatch } from "react-redux";
import { deleteItem } from "../../redux/actionCreators/fileFolderActionCreators";

import "./contextMenu.css";

const ContextMenu = ({ cordinates, id, setOpen }: propTypes) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteItem(id));
    setOpen(false);
  };

  return (
    <div
      style={{ top: cordinates.y, left: cordinates.x }}
      className="cm901Menu"
      onClick={() => setOpen(false)}
    >
      <div className="cm241MenuItem">Open</div>
      <div className="cm241MenuItem">Show Details</div>
      <div onClick={handleClick} className="cm241MenuItem">
        Delete
      </div>
    </div>
  );
};

type propTypes = {
  cordinates: { x: number; y: number };
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default ContextMenu;
