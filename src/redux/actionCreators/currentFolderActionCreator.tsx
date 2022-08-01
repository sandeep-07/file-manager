import * as types from "../actionTypes/actionTypes";

export const changeFolder = (payload: string) => {
  return {
    type: types.CHANGE_FOLDER,
    payload,
  };
};
