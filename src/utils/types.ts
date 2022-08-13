import { Location } from "history";

export interface ILocation {
    background?: Location;
    state?: {
        from: Location;
    };
}

export interface IIngredient {
    name: string,
    price: number,
    fat: number,
    calories: number,
    carbohydrates: number,
    proteins: number,
    image: string,
    image_large: string,
    image_mobile: string,
    __v?: number,
    _id: string,
    key?: number,
    index?: number;
}

