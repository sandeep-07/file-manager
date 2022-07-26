import { combineReducers } from "redux";
import currentFolderReducer from "./currentFolderReducer";
import fileFolderReducer from "./fileFolderReducer";

const rootReducer = combineReducers({
  fileFolder: fileFolderReducer,
  currentFolder: currentFolderReducer,
});

export default rootReducer;
