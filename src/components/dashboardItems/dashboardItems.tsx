import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeFolder } from "../../redux/actionCreators/currentFolderActionCreator";
import { deleteItem } from "../../redux/actionCreators/fileFolderActionCreators";
import ContextMenu from "../contextMenu/contextMenu";

import "./dashboardItems.css";
type propTypes = {
  items: any;
};
const DashboardItems = ({ items }: propTypes) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDoubleClick = (name: string, id: string, isFolder: string) => {
    if (!isFolder) {
      navigate(`/file/${name}/${id}`);
      return;
    }
    dispatch(changeFolder(id));
    navigate(`/${id}`);
  };

  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [open, setOpen] = useState(false);

  const [itemRightClicked, setItemRightClicked] = useState("");
  const handleContextMenuClick = (e: any, id: string) => {
    e.preventDefault();
    setCoordinates({ x: e.pageX, y: e.pageY });
    setItemRightClicked(id);
    setOpen(true);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    setCoordinates({ x: 2000, y: 2000 });
  };

  useEffect(() => {
    window.addEventListener("click", () => {
      setOpen(false);
    });
  }, [coordinates]);

  return (
    <div className="di204Row">
      {open && (
        <ContextMenu
          setOp={setOpen}
          coord={coordinates}
          setCoor={setCoordinates}
          id={itemRightClicked}
        />
      )}
      {items.map((item: any, idx: number) => (
        <div
          onClick={handleClick}
          onContextMenu={(e) => handleContextMenuClick(e, item.id)}
          onDoubleClick={() =>
            handleDoubleClick(item.name, item.id, item.isFolder)
          }
          key={idx}
          className="di123Col"
        >
          {item.isFolder ? (
            <div className="di039ColContainer">
              <img
                className="di019Image"
                src="https://img.icons8.com/color/96/000000/folder-invoices--v1.png"
              />
              <div className="di029ItemName">{item.name}</div>
            </div>
          ) : (
            <div className="di039ColContainer">
              <img
                className="di019Image"
                style={{ width: "50px" }}
                src="data:image/png;base64,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"
              />
              <div className="di029ItemName">{item.name}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardItems;
