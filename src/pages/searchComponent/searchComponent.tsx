import React from "react";
import { useSelector } from "react-redux";
import DashboardItems from "../../components/dashboardItems/dashboardItems";

const SearchComponent = () => {
  const searchResults = useSelector((state: any) => state.search.searchResults);

  return <DashboardItems items={searchResults} />;
};

export default SearchComponent;
