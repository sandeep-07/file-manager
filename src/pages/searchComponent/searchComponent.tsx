import { useSelector } from "react-redux";
import DashboardItems from "../../Components/DashboardItems/DashboardItems";
import empty from "../../assets/empty.jpg";

import "./searchComponent.css";
const SearchComponent = () => {
  const searchResults = useSelector((state: any) => state.search.searchResults);

  if (searchResults.length === 0) {
    return (
      <div className="sc910NotFoundContainer">
        <img src={empty} alt="empty" className="sc929NotFoundImage" />
        <h2>No results found</h2>
      </div>
    );
  }
  return <DashboardItems items={searchResults} />;
};

export default SearchComponent;
