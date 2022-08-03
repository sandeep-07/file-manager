import DashboardItems from "../../Components/DashboardItems";
import { DataType } from "../../types/interfaces";

const HomePage = ({ filesAndFolder }: any) => {
  return (
    <div>
      <DashboardItems items={filesAndFolder} />
    </div>
  );
};

export default HomePage;
