import DashboardItems from "../../components/dashboardItems/dashboardItems";

const HomePage = ({ children }: any) => {
  return (
    <div>
      <DashboardItems items={children} />
    </div>
  );
};

export default HomePage;
