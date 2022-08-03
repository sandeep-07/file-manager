import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DashboardItems from "../../Components/DashboardItems/DashboardItems";
import { DataType, GlobalType } from "../../types/interfaces";
import emptyFolder from "../../assets/emptyFolder.png";

import "./folderComponent.css";

const FolderComponent = (): JSX.Element => {
  const { folderId } = useParams();
  let allFoldersHere: DataType = {} as DataType;

  const eachRecursive = (obj: DataType, id: string | undefined) => {
    if (obj.id === id) {
      {
        allFoldersHere = obj;
        return obj;
      }
    }
    for (var k in obj.children) {
      eachRecursive(obj.children[k], id);
    }
  };

  const data = useSelector((state: GlobalType) => state.fileFolder);

  eachRecursive(data, folderId);

  if (allFoldersHere.children.length !== 0) {
    return (
      <div>
        <DashboardItems items={allFoldersHere.children} />
      </div>
    );
  }
  return (
    <div className="fc881NotFoundContainer">
      <img className="fc888Image" src={emptyFolder} alt="emptyFolder" />
      <h2>Empty folder</h2>
    </div>
  );
};

export default FolderComponent;
