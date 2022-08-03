export interface DataType {
    name: string;
    id: string;
    isFolder: boolean;
    isAdmin: boolean;
    type: string,
    createdAt: string,
    creator: string,
    path: [{ name: string, id: string }];
    children: DataType[];
}

interface SearchType{
    query: string;
    searchResult: DataType[];
}

export interface GlobalType{
    fileFolder: DataType;
    currentFolder: string;
    search:SearchType
    
}