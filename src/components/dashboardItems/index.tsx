import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { DataType } from "../../types/interfaces";
import DetailsModal from "../DetailsModal";
import { changeFolder } from "../../redux/actionCreators/currentFolderActionCreator";
import ContextMenu from "../ContextMenu";
import homeFolder from "../../assets/homeFolder.png";
import desktopFolder from "../../assets/desktopFolder.png";
import downloads from "../../assets/downloads.png";
import documents from "../../assets/documents.png";
import fileIcon from "../../assets/fileIcon.png";
import pictures from "../../assets/pictures.png";
import folder from "../../assets/folder.png";

import "./dashboardItems.css";

const DashboardItems = ({ items }: propTypes) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [itemRightClicked, setItemRightClicked] = useState<DataType>(
    {} as DataType
  );
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

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
    item: DataType
  ) => {
    e.preventDefault();
    setCoordinates({ x: e.pageX, y: e.pageY });
    setItemRightClicked(item);
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
      case "Pictures":
        return <img src={pictures} className="di019Image" alt="pictures" />;

      default:
        return <img src={folder} className="di019Image" />;
    }
  };

  const [openDetails, setOpenDetails] = useState(false);
  const [showDetailsOfItem, setShowDetailsOfItem] = useState<DataType>(
    {} as DataType
  );

  return (
    <div className="di204Row">
      {open && (
        <ContextMenu
          setOpen={setOpen}
          cordinates={coordinates}
          item={itemRightClicked}
          setShowDetailsOfItem={setShowDetailsOfItem}
          setOpenDetails={setOpenDetails}
        />
      )}
      {openDetails && (
        <DetailsModal setIsOpen={setOpenDetails} item={showDetailsOfItem} />
      )}
      {items?.map((item: DataType, idx: number) => (
        <div
          onClick={handleClick}
          onContextMenu={(e) => handleContextMenuClick(e, item)}
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
  items: DataType[];
};

export default DashboardItems;
