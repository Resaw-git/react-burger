import { Location } from "history";

export interface ILocation {
    from: Location;
    background?: Location;
    pathname: string;
}

export interface IIngredient {
    name: string;
    price: number;
    type: string;
    fat: number;
    calories: number;
    carbohydrates: number;
    proteins: number;
    image: string;
    image_large: string;
    image_mobile: string;
    __v?: number;
    _id: string;
    id?: string;
    key?: number;
    index?: number;
    count: number;
}

export interface IFeed {
    orders: IOrder[];
    success: boolean;
    total: number;
    totalToday: number;
}

export interface IOrder {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
}

export interface IForm {
    name?: string;
    email?: string;
    password?: string;
    token?: string;
}

