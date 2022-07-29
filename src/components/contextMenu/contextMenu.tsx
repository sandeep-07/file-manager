import { useDispatch } from "react-redux";
import { deleteItem } from "../../redux/actionCreators/fileFolderActionCreators";
import "./contextMenu.css";

const ContextMenu = ({ coord, setCoor, id, setOp }: any) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(deleteItem(id));
    setOp(false);
  };
  return (
    <div
      style={{ top: coord.y, left: coord.x }}
      className="cm901Menu"
      onClick={() => setOp(false)}
    >
      <div className="cm241MenuItem">Open</div>
      <div  className="cm241MenuItem">Show Details</div>
      <div onClick={handleClick} className="cm241MenuItem">Delete</div>
    </div>
  );
};

export default ContextMenu;
