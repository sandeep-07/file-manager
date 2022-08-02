import DashboardItems from "../../components/dashboardItems/dashboardItems";
import { dataType } from "../../types/interfaces";

const HomePage = ({ children }: any) => {
  return (
    <div>
      <DashboardItems items={children} />
    </div>
  );
};

export default HomePage;
