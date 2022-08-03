import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { DataType } from "../../types/interfaces";
import { changeFolder } from "../../redux/actionCreators/currentFolderActionCreator";

//assets
import homeFolder from "../../assets/homeFolder.png";
import desktopFolder from "../../assets/desktopFolder.png";
import downloads from "../../assets/downloads.png";
import documents from "../../assets/documents.png";
import folder from "../../assets/folder.png";
import fileIcon from "../../assets/fileIcon.png";
import pictures from "../../assets/pictures.png";

import "./sidebar.css";

const getFolderIcon = (data: DataType) => {
  const { name } = data;
  switch (name) {
    case "Home":
      return <img className="sb279ItemImage" src={homeFolder} alt="home" />;

    case "Desktop":
      return (
        <img className="sb279ItemImage" src={desktopFolder} alt="desktop" />
      );

    case "Downloads":
      return <img className="sb279ItemImage" src={downloads} alt="downloads" />;

    case "Documents":
      return <img className="sb279ItemImage" src={documents} alt="documents" />;

    case "Pictures":
      return <img className="sb279ItemImage" src={pictures} alt="pictures" />;

    default:
      return <img className="sb279ItemImage " src={folder} />;
  }
};

function Sidebar({ data }: propTypes) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [expand, setExpand] = React.useState(true);

  const handleClick = (data: DataType) => {
    if (!data.isFolder) {
      navigate(`/file/${data.name}/${data.id}`);
      return;
    }

    if (data.id === "root") {
      navigate("/");
      dispatch(changeFolder("root"));
      return;
    }

    dispatch(changeFolder(data.id));

    navigate(`/${data.id}`);
  };

  if (data.isFolder)
    return (
      <>
        <div className="sb279Item" onClick={() => handleClick(data)}>
          <div className="sb279ImageContainer">{getFolderIcon(data)}</div>
          <div className="sb279ItemText">{data.name}</div>
        </div>
        <div style={{ display: expand === true ? "block" : "none" }}>
          {data.children.map((item: DataType, idx: number) => (
            <div key={idx} style={{ marginLeft: 9 }} className="sb279Items">
              <Sidebar data={item} />
            </div>
          ))}
        </div>
      </>
    );
  else {
    return (
      <div
        className="sb279Item"
        onClick={() => navigate(`/file/${data.name}/${data.id}`)}
      >
        <img className="sb279ItemImage" src={fileIcon} alt="file" />
        <p className="sb279ItemText">{data.name} </p>
      </div>
    );
  }
}

interface propTypes {
  data: DataType;
}

export default Sidebar;
