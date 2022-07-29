import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";

import "./fileComponent.css";
const FileComponent = () => {
  const { query, fileId } = useParams();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const CLIENT_ID = "S3JbSCnpwZos07ZknjSnOVvPHN7pOcriBHqn496TSqg";
  
  const getPhotos = async () => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${CLIENT_ID}&page=${page}&per_page=20&orientation=landscape`
    );
    const dataFetched = await response.json();

    dataFetched.results.map((item: any) => {
      setData((prevData: any) => [
        ...new Set([...prevData, item.urls.regular]),
      ]);
    });
    setPage((prevPage) => prevPage + 1);
    if (dataFetched.results.length < 20) {
      setHasMore(false);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    getPhotos();
  }, []);
  const [modal, setModal] = useState(false);
  const [tempImage, setTempImage] = useState("");

  const getImg = (imgSrc: string) => {
    setTempImage(imgSrc);
    setModal(true);
  };
  return (
    <InfiniteScroll
      dataLength={data.length} //This is important field to render the next data
      next={getPhotos}
      hasMore={hasMore}
      height={"100vh"}
      loader={<h1>Loading....</h1>}
      endMessage={<h1>The End</h1>}
    >
      <>
        <div className={modal ? "fc267Modal fc781Open" : "fc267Modal"}>
          <img src={tempImage} alt="modal" />
          <i
            className="fa-solid fa-xmark fc891CloseIcon"
            onClick={() => setModal(false)}
          ></i>
        </div>
        <div className="fc901Gallery">
          {data.map((item: any, index: number) => {
            return (
              <div
                className="fc018Pics"
                key={index}
                onClick={() => getImg(item)}
              >
                <img
                  src={item}
                  alt=""
                  style={{ width: "100%" }}
                  className="fc999Image"
                />
              </div>
            );
          })}
        </div>
      </>
    </InfiniteScroll>
  );
};

export default FileComponent;
