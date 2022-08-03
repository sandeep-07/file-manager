import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import errorAPI from "../../assets/errorAPI.png";
import Loader from "./LoaderComponent/Loader";
import EndComponent from "./EndComponent/EndComponent";
import "./fileComponent.css";

const FileComponent = () => {
  const { query, fileId } = useParams();

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loadImage, setLoadImage] = useState(false);

  const CLIENT_ID = "XbAz5Y3y1lpBuqdo4jkakWrKZGkaYHFwGqbbZTAlzW0";

  const [loaded, setLoaded] = useState(false);
  const ref = useRef<any>();

  const onLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    if (ref.current && ref.current.complete) {
      onLoad();
    }
  });

  const getPhotos = async () => {
    setError("");
    setLoading(true);
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${CLIENT_ID}&page=${page}&per_page=20&orientation=landscape`
      )
      .then((res) => {
        res.data.results.map((item: any) => {
          setData((prevData: any) => [
            ...new Set([...prevData, item.urls.regular]),
          ]);
        });
        setPage((prevPage) => prevPage + 1);
        if (res.data.results.length < 20) {
          setHasMore(false);
          setLoading(false);
          setError("");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    setData([]);
    setLoading(false);
    setError("");
    getPhotos();
  }, [query]);

  useEffect(() => {
    getPhotos();
  }, []);

  const [modal, setModal] = useState(false);
  const [tempImage, setTempImage] = useState("");

  const getImg = (imgSrc: string) => {
    setTempImage(imgSrc);
    setModal(true);
  };

  if (error.length === 0) {
    return (
      <InfiniteScroll
        dataLength={data.length} //This is important field to render the next data
        next={getPhotos}
        hasMore={hasMore}
        height={"90vh"}
        loader={<Loader />}
        endMessage={<EndComponent />}
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
            {/* <div className="fc999Image">
              <Skeleton width={"100%"} height={"100%"} />
            </div> */}
            {data.map((item: any, index: number) => {
              let loadHuiImage = false;
              return (
                <div
                  className="fc018Pics"
                  key={index}
                  onClick={() => getImg(item)}
                >
                  <>
                    {/* <img
                      src={item}
                      alt=""
                      className="fc999Image"
                      onLoad={() => {
                        console.log(`Load hui ${index} image`);
                      }}
                    /> */}
                    <img
                      className="fc999Image"
                      ref={ref}
                      onLoad={onLoad}
                      src={item}
                      alt=""
                    />
                    {/* {(loaded===true)? ():()} */}
                  </>
                </div>
              );
            })}
          </div>
        </>
      </InfiniteScroll>
    );
  } else {
    return (
      <div>
        <img src={errorAPI} className="" />
        <h2>{error}</h2>
      </div>
    );
  }
};

export default FileComponent;
