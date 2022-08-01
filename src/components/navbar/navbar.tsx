import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { dataType } from "../../types/interfaces";
import { changeFolder } from "../../redux/actionCreators/currentFolderActionCreator";
import { setQuery } from "../../redux/actionCreators/searchActionCreator";
import "./navbar.css";

const Navbar = ({ setIsOpen }: propTypes) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentFolder = useSelector((state: any) => state.currentFolder);
  const data = useSelector((state: any) => state.fileFolder);
  const [str, setStr] = useState("");
  let getCurrentObject = {} as dataType;
  const eachRecursive = (obj: dataType, id: string) => {
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
      dispatch(setQuery({ query: "", globalState: data }));
      dispatch(changeFolder("root"));
      return;
    }
    dispatch(changeFolder(link));
    navigate("/" + link);
  };

  const handleChange = (value: any) => {
    dispatch(setQuery({ query: value, globalState: data }));
  };
  const debounce = (func: Function) => {
    let timer: number;
    return (...args: Array<String>) => {
      const context: undefined = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, 500);
    };
  };

  const optimizedFn = useCallback(debounce(handleChange), []);

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
              {item.name} {` `}
              {`>  `}
              {` `}
            </span>
          ))}
        </div>
      </div>
      <div className="nb267NavbarContainer">
        <div className="nb092NavbarContainerLeft">
          <i
            className="fa-solid fa-plus nb361OpenModalIcon"
            onClick={() => setIsOpen(true)}
          >
            Add
          </i>
        </div>
        <div className="nb092NavbarContainerRight">
          <i className="fa-solid fa-search nb773Icon"></i>
          <input
            type="text"
            className="nb464InputField"
            placeholder=" Search"
            onChange={(e) => {
              optimizedFn(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

type propTypes = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

type pathType = {
  name: string;
  link: string;
};

export default Navbar;
