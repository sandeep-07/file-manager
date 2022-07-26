import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeFolder } from "../../redux/actionCreators/currentFolderActionCreator";
import { deleteItem } from "../../redux/actionCreators/fileFolderActionCreators";

type propTypes = {
  items: any;
};
const DashboardItems = ({ items }: propTypes) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDoubleClick = (id: string, isFolder: string) => {
    if (!isFolder) {
      alert("file opened");
      return;
    }
    dispatch(changeFolder(id));
    navigate(`/${id}`);
  };

  const handleContextMenuClick = (e: any, id: string) => {
    e.preventDefault();
    dispatch(deleteItem(id));
  };
  return (
    <div>
      {items.map((item: any, idx: number) => (
        <span
          onContextMenu={(e) => handleContextMenuClick(e, item.id)}
          onDoubleClick={() => handleDoubleClick(item.id, item.isFolder)}
          key={idx}
          style={{ margin: 10, padding: 10, borderWidth: 1, cursor: "pointer" }}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
};

export default DashboardItems;
