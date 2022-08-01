import { dataType } from "../../types/interfaces";
import "./detailsModal.css";

const DetailsModal = ({ setIsOpen, item }: propTypes) => {
  return (
    <>
      <div className="dm999darkBG" onClick={() => setIsOpen(false)} />
      <div className="dm9349centered">
        <div className="dm223Modal">
          <div className="modalHeader">
            <h5 className="dm200Heading">Details</h5>
          </div>
          <button className="dm009CloseBtn" onClick={() => setIsOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="dm900ModalContent">
            <div className="dm950Row">
              <div className="dm999Column">
                <div className="dm288Left">Name</div>
                <div className="dm283Right">{item.name}</div>
              </div>
            </div>
            <div className="dm950Row">
              <div className="dm999Column">
                <div className="dm288Left">Type</div>
                <div className="dm283Right">
                  {item.type?.length == 0 ? <p>General</p> : <p>{item.type}</p>}
                </div>
              </div>
            </div>
            <div className="dm950Row">
              <div className="dm999Column">
                <div className="dm288Left">Created at</div>
                <div className="dm283Right">{item.createdAt}</div>
              </div>
            </div>
            <div className="dm950Row">
              <div className="dm999Column">
                <div className="dm288Left">Created By</div>
                <div className="dm283Right">
                  {item.creator.length == 0 ? (
                    <>Guest</>
                  ) : (
                    <p>{item.creator}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="dm950Row">
              <div className="dm999Column">
                <div className="dm288Left">Items contained</div>
                <div className="dm283Right">{item.children?.length || 0}</div>
              </div>
            </div>
          </div>
          <div className="modalActions">
            <div className="dm237ActionsContainer"></div>
          </div>
        </div>
      </div>
    </>
  );
};

type propTypes = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: dataType;
};

export default DetailsModal;
