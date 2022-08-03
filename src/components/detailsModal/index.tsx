import { DataType } from "../../types/interfaces";
import "./detailsModal.css";

const DetailsModal = ({ setIsOpen, item }: propTypes) => {
  return (
    <>
      <div className="dm349darkBG" onClick={() => setIsOpen(false)} />
      <div className="dm349centered">
        <div className="dm349Modal">
          <div className="dm349ModalHeader">
            <h5 className="dm349Heading">Details</h5>
          </div>
          <button className="dm349CloseBtn" onClick={() => setIsOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="dm349ModalContent">
            <div className="dm349Row">
              <div className="dm349Column">
                <div className="dm349Left">Name</div>
                <div className="dm349Right">{item.name}</div>
              </div>
            </div>
            <div className="dm349Row">
              <div className="dm349Column">
                <div className="dm349Left">Type</div>
                <div className="dm349Right">
                  {item.type?.length == 0 ? <p>General</p> : <p>{item.type}</p>}
                </div>
              </div>
            </div>
            <div className="dm349Row">
              <div className="dm349Column">
                <div className="dm349Left">Created at</div>
                <div className="dm349Right">{item.createdAt}</div>
              </div>
            </div>
            <div className="dm349Row">
              <div className="dm349Column">
                <div className="dm349Left">Created By</div>
                <div className="dm349Right">
                  {item.creator.length == 0 ? (
                    <>Guest</>
                  ) : (
                    <p>{item.creator}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="dm349Row">
              <div className="dm349Column">
                <div className="dm349Left">Items contained</div>
                <div className="dm349Right">{item.children?.length || 0}</div>
              </div>
            </div>
          </div>
          <div className="dm349ModalActions">
            <div className="dm349ActionsContainer"></div>
          </div>
        </div>
      </div>
    </>
  );
};

type propTypes = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: DataType;
};

export default DetailsModal;
