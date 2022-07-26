const uuid = () => {
  return 97 + Math.round((Math.random() * 10) % 26);
};
export const getUuid = () => {
  let str: string = "";
  for (let i = 1; i <= 20; i++) str = str + String.fromCharCode(uuid());
  return str;
};

export {};
