import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { dataType } from "../../types/interfaces";
import { changeFolder } from "../../redux/actionCreators/currentFolderActionCreator";
import homeFolder from "../../assets/homeFolder.png";
import desktopFolder from "../../assets/desktopFolder.png";
import downloads from "../../assets/downloads.png";
import documents from "../../assets/documents.png";
import bin from "../../assets/bin.png";
import folder from "../../assets/folder.png";
import fileIcon from "../../assets/fileIcon.png";

import "./sidebar.css";

const getFolderIcon = (data: dataType) => {
  const { name } = data;
  switch (name) {
    case "Home":
      return <img className="sb828ItemImage" src={homeFolder} alt="home" />;
    case "Desktop":
      return (
        <img className="sb828ItemImage" src={desktopFolder} alt="desktop" />
      );
    case "Downloads":
      return <img className="sb828ItemImage" src={downloads} alt="downloads" />;
    case "Documents":
      return <img className="sb828ItemImage" src={documents} alt="documents" />;
    case "Recycle Bin":
      return <img className="sb828ItemImage" src={bin} alt="bin" />;

    default:
      return <img className="sb828ItemImage " src={folder} />;
  }
};

function Sidebar({ data }: propTypes) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expand, setExpand] = React.useState(true);
  const handleClick = (data: any) => {
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
        <div
          className="sb279Item"
          // onClick={() => setExpand(!expand)}
          onClick={() => handleClick(data)}
        >
          <div className="sb682ImageContainer">{getFolderIcon(data)}</div>
          <div className="sb818ItemText">{data.name}</div>
        </div>
        <div style={{ display: expand === true ? "block" : "none" }}>
          {data.children.map((item: dataType, idx: number) => (
            <div key={idx} style={{ marginLeft: 5 }} className="sb273Items">
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
        <img className="sb828ItemImage" src={fileIcon} alt="file" />
        <p className="sb818ItemText">{data.name} </p>
      </div>
    );
  }
}

interface propTypes {
  data: dataType;
}

export default Sidebar;
