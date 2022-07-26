import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeFolder } from "../../redux/actionCreators/currentFolderActionCreator";
import "./navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  const currentFolder = useSelector((state: any) => state.currentFolder);
  const data = useSelector((state: any) => state.fileFolder);
  let thisObj = {} as any;
  const eachRecursive = (obj: any, id: any) => {
    if (obj.id === id) {
      {
        thisObj = obj;
        return obj;
      }
    }
    for (var k in obj.children) {
      eachRecursive(obj.children[k], id);
    }
  };
  const dispatch = useDispatch();
  eachRecursive(data, currentFolder);
  //   console.log("kiske andar ho", thisObj.path);
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
          {thisObj?.path?.map((item: any, index: number) => (
            <span
              key={index}
              className={`nb172BreadcrumbItem ${
                index === thisObj.path.length - 1 ? "nb278active" : ""
              }`}
              onClick={() => handleClick(item.link)}
            >
              {item.name} {` `}/{` `}
            </span>
          ))}
        </div>
      </div>
      <div className="nb267NavbarRightContainer">
        <input className="nb341Input" placeholder="Search for anything" />
      </div>
    </div>
  );
};

export default Navbar;
