import * as types from "../actionTypes/fileFolderActionTypes";

export const createItem = (payload: any) => {
  return {
    type: types.CREATE_ITEM,
    payload,
  };
};

export const deleteItem = (payload: any) => {
  return {
    type: types.DELETE_ITEM,
    payload,
  };
};
