import React from "react";
import "./sidebar.css";
type propTypes = {
  data: any;
};
function Sidebar({ data }: propTypes) {
  const [expand, setExpand] = React.useState(false);

  return (
    <div className="">
      {data?.isFolder === true ? (
        <>
          <div>{data.name}</div>
          <div className="">
            {data.children.map((item: any, idx: number) => (
              <div key={idx} style={{ marginLeft: 5 }} className="sb273Items">
                <Sidebar data={item} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>{data.name}</>
      )}
    </div>
  );
}

export default Sidebar;
