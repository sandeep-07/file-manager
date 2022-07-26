import * as types from "../actionTypes/fileFolderActionTypes";

export const changeFolder = (payload: any) => {
  return {
    type: types.CHANGE_FOLDER,
    payload,
  };
};
