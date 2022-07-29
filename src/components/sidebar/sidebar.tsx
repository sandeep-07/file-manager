import React from "react";
import "./sidebar.css";
import home from "../../assets/home.png";
import { createItem } from "../../redux/actionCreators/fileFolderActionCreators";
type propTypes = {
  data: any;
};
function Sidebar({ data }: propTypes) {
  const [expand, setExpand] = React.useState(false);

  return (
    <div className="">
      {data?.isFolder === true ? (
        <>
          <div className="sb279Item">
            <div className="sb682ImageContainer">
              {data.name === "Home" && (
                <img src={home} className="sb828ItemImage" />
              )}
              {data.name === "Desktop" && (
                <img
                  src="https://img.icons8.com/fluency/48/000000/desktop.png"
                  className="sb828ItemImage"
                />
              )}
              {data.name === "Downloads" && (
                <img
                  className="sb828ItemImage"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAjElEQVRIie2UQQ5AMBBFfx2rYTPX6Jor2NbOFXSt12DDudiJROgvIhHeuvPeJE0LvB3FHhTXjoDSADABQ1+YjJlLInbRq61SdioicI4/8Aeus/vQxPkSQE1abJebKipARw7kwUAwEpBTgd0IIacDmwgpj0Yab6Xx9nbxt1kuWZyf7hR3hVHAA1/F+5kBHDwnkio/q6YAAAAASUVORK5CYII="
                />
              )}
              {data.name === "Documents" && (
                <img
                  className="sb828ItemImage"
                  src="https://img.icons8.com/fluency/96/000000/documents.png"
                />
              )}
              {data.name === "Recycle Bin" && (
                <img
                  className="sb828ItemImage"
                  src="https://img.icons8.com/color/96/000000/recycle-bin.png"
                />
              )}
            </div>
            <div className="sb818ItemText">{data.name}</div>
          </div>
          <div className="">
            {data.children.map((item: any, idx: number) => (
              <div key={idx} style={{ marginLeft: 5 }} className="sb273Items">
                <Sidebar data={item} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="sb279Item">{data.name}</div>
      )}
    </div>
  );
}

export default Sidebar;
