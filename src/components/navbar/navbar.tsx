import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changeFolder } from "../../redux/actionCreators/currentFolderActionCreator";
import { setQuery } from "../../redux/actionCreators/searchActionCreator";
import "./navbar.css";

const Navbar = ({ setIsOpen }: propTypes) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [query, setQueryString] = useState("");

  const stringQuery = useSelector((state: any) => state.search);
  console.log(stringQuery);

  const currentFolder = useSelector((state: any) => state.currentFolder);
  const data = useSelector((state: any) => state.fileFolder);

  let getCurrentObject = {} as any;
  const eachRecursive = (obj: any, id: string) => {
    if (obj.id === id) {
      {
        getCurrentObject = obj;
        return obj;
      }
    }
    for (let k in obj.children) {
      eachRecursive(obj.children[k], id);
    }
  };
  eachRecursive(data, currentFolder);

  const handleClick = (link: string) => {
    if (link === "") {
      navigate("/");
      dispatch(changeFolder("root"));
      return;
    }
    dispatch(changeFolder(link));
    navigate("/" + link);
  };

  return (
    <div className="nb719Navbar">
      <div className="nb527NavbarLeftContainer">
        <div className="nb192Breadcrumb">
          {getCurrentObject?.path?.map((item: any, index: number) => (
            <span
              key={index}
              className={`nb172BreadcrumbItem ${
                index === getCurrentObject.path.length - 1 ? "nb278active" : ""
              }`}
              onClick={() => handleClick(item.link)}
            >
              {item.name} {` `}/{` `}
            </span>
          ))}
        </div>
      </div>
      <div className="nb267NavbarRightContainer">
        <i
          className="fa-solid fa-plus nb361OpenModalIcon"
          onClick={() => setIsOpen(true)}
        ></i>

        <input
          onChange={(e) => dispatch(setQuery(e.target.value))}
          type="text"
          className="nb452Icon nb341Input"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

type propTypes = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

export default Navbar;
