import DashboardItems from "../../Components/DashboardItems/DashboardItems";
import { DataType } from "../../types/interfaces";

const HomePage = ({ children }: any) => {
  return (
    <div>
      <DashboardItems items={children} />
    </div>
  );
};

export default HomePage;
