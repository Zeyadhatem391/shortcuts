

export interface Shortcuts {
    id:string;
    title:string;
    des?:string;
    url:string;
    category?:Category[];
    favorite: boolean,
}

export interface Category {
    id:string;
    title:string;
}


