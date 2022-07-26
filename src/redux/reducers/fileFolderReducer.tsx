import * as types from "../actionTypes/fileFolderActionTypes";
const intitialState = {
  name: "root",
  id: "root",
  path: [{ name: "root", link: "" }],
  isFolder: true,
  children: [],
};
const eachRecursive = (obj: any, id: string, item: any) => {
  if (obj.id === id) {
    {
      const pathTillParent = obj.path;
      const newPath = [...pathTillParent, { name: item.name, link: item.id }];
      const newItem = { ...item, path: newPath };
      obj.children.push(newItem);
      return;
    }
  }
  for (var k in obj.children) {
    eachRecursive(obj.children[k], id, item);
  }
};

const deleteRecursive = (obj: any, parent: any, id: string) => {
  if (obj.id === id) {
    {
      console.log(obj, parent, id);
      const newChildren = parent.children.filter((item: any) => item.id !== id);
      parent.children = newChildren;
      return;
    }
  }
  for (var k in obj.children) {
    deleteRecursive(obj.children[k], obj, id);
  }
};
const fileFolderReducer = (state = intitialState, action: any) => {
  switch (action.type) {
    case types.CREATE_ITEM:
      const { createInside, item } = action.payload;
      const newState = { ...state };
      // console.log(createInside, item);
      eachRecursive(newState, createInside, item);
      return newState;
    case types.DELETE_ITEM:
      const deleteThis = action.payload;
      const newState2 = { ...state };
      deleteRecursive(newState2, "", deleteThis);
      return newState2;
  }
  return state;
};
export default fileFolderReducer;
