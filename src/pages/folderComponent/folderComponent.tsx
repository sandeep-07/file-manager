import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DashboardItems from "../../components/dashboardItems/dashboardItems";
import { dataType, globalType } from "../../types/interfaces";
import emptyFolder from "../../assets/emptyFolder.svg";

import "./folderComponent.css";

const FolderComponent = (): JSX.Element => {
  const { folderId } = useParams();
  let allFoldersHere: dataType = {} as dataType;
  const eachRecursive = (obj: dataType, id: string | undefined) => {
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

  const data = useSelector((state: globalType) => state.fileFolder);
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
    </div>
  );
};

export default FolderComponent;
