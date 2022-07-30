import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { dataType } from "../../types/interfaces";
import { changeFolder } from "../../redux/actionCreators/currentFolderActionCreator";
import ContextMenu from "../contextMenu/contextMenu";
import homeFolder from "../../assets/homeFolder.png";
import desktopFolder from "../../assets/desktopFolder.png";
import downloads from "../../assets/downloads.png";
import documents from "../../assets/documents.png";
import fileIcon from "../../assets/fileIcon.png";
import bin from "../../assets/bin.png";
import folder from "../../assets/folder.png";

import "./dashboardItems.css";

const DashboardItems = ({ items }: propTypes) => {
  const [open, setOpen] = useState(false);
  const [itemRightClicked, setItemRightClicked] = useState("");
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("click", () => {
      setOpen(false);
    });
  }, [coordinates]);

  const handleDoubleClick = (name: string, id: string, isFolder: boolean) => {
    if (!isFolder) {
      navigate(`/file/${name}/${id}`);
      return;
    }
    dispatch(changeFolder(id));
    navigate(`/${id}`);
  };

  const handleContextMenuClick = (
    e: React.MouseEvent<HTMLDivElement>,
    id: string
  ) => {
    e.preventDefault();
    setCoordinates({ x: e.pageX, y: e.pageY });
    setItemRightClicked(id);
    setOpen(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOpen(false);
  };

  const getFolderIcon = (name: string) => {
    switch (name) {
      case "Home":
        return <img src={homeFolder} className="di019Image" alt="home" />;
      case "Desktop":
        return <img src={desktopFolder} className="di019Image" alt="desktop" />;
      case "Downloads":
        return <img src={downloads} className="di019Image" alt="downloads" />;
      case "Documents":
        return <img src={documents} className="di019Image" alt="documents" />;
      case "Recycle Bin":
        return <img src={bin} className="di019Image" alt="bin" />;

      default:
        return <img src={folder} className="di019Image" />;
    }
  };

  return (
    <div className="di204Row">
      {open && (
        <ContextMenu
          setOpen={setOpen}
          cordinates={coordinates}
          id={itemRightClicked}
        />
      )}
      {items?.map((item: dataType, idx: number) => (
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
              {item.isAdmin === true ? (
                getFolderIcon(item.name)
              ) : (
                <img src={folder} className="di019Image" />
              )}
              <div className="di029ItemName">{item.name}</div>
            </div>
          ) : (
            <div className="di039ColContainer">
              <img className="di019Image" src={fileIcon} />
              <div className="di029ItemName">{item.name}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

type propTypes = {
  items: dataType[];
};

export default DashboardItems;
