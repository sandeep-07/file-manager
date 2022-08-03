import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { DataType, GlobalType } from "../../types/interfaces";
import { changeFolder } from "../../redux/actionCreators/currentFolderActionCreator";
import { setQuery } from "../../redux/actionCreators/searchActionCreator";
import "./navbar.css";

const Navbar = ({ setIsOpen }: propTypes) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentFolder = useSelector((state: GlobalType) => state.currentFolder);
  const data = useSelector((state: GlobalType) => state.fileFolder);

  let getCurrentObject = {} as DataType;

  const eachRecursive = (obj: DataType, id: string) => {
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

  const handleChange = (value: string) => {
    dispatch(setQuery({ query: value, globalState: data }));
  };

  const debounce = (func: Function) => {
    let timer: number;

    return (...args: Array<String>) => {
      const context: undefined = this;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func.apply(context, args);
      }, 500);
    };
  };

  const optimizedFn = useCallback(debounce(handleChange), []);

  return (
    <div className="nb719Navbar">
      <div className="nb719NavbarLeftContainer">
        <div className="nb719Breadcrumb">
          <div >
            {getCurrentObject?.path?.map((item: any, index: number) => (
              <span
                key={index}
                className={`nb719BreadcrumbItem ${
                  index === getCurrentObject.path.length - 1
                    ? "nb719active"
                    : ""
                }`}
                onClick={() => handleClick(item.link)}
              >
                {index === getCurrentObject.path.length - 1 ? (
                  <span>{item.name}</span>
                ) : (
                  <span>{`${item.name}  >  `}</span>
                )}
              </span>
            ))}
          </div>
          <div >
            <i
              className="fa-solid fa-plus nb719OpenModalIcon"
              onClick={() => setIsOpen(true)}
            >
              Add
            </i>
          </div>
        </div>
      </div>
      <div className="nb719NavbarContainer">
        <div className="nb719NavbarContainerLeft"></div>
        <div className="nb719NavbarContainerRight">
          <i className="fa-solid fa-search nb719Icon"></i>
          <input
            type="text"
            className="nb719InputField"
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

export default Navbar;
