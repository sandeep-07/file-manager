import { useSelector } from "react-redux";
import DashboardItems from "../../components/dashboardItems/dashboardItems";
import { globalType } from "../../types/interfaces";

const HomePage = () => {
  const { rootFolderDetails } = useSelector((state: globalType) => ({
    rootFolderDetails: state.fileFolder,
  }));

  return (
    <div>
      <DashboardItems items={rootFolderDetails.children} />
    </div>
  );
};

export default HomePage;
