import React from "react";
import { useSelector } from "react-redux";
import DashboardItems from "../../components/dashboardItems/dashboardItems";

const HomePage = () => {
  const { rootFolderDetails } = useSelector((state: any) => ({
    rootFolderDetails: state.fileFolder,
  }));

  return (
    <div>
      <DashboardItems items={rootFolderDetails.children} />
    </div>
  );
};

export default HomePage;
