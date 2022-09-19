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
}

export interface IForm {

}

