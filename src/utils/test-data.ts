import {IFeed, IIngredient} from "./types";

export const testIngredient: IIngredient = {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    image: "",
    image_large: "",
    image_mobile: "",
    name: "",
    price: 0,
    proteins: 0,
    type: "",
    count: 0,
    _id: "",
    id: "test-id",
};

export const testFeed : IFeed = {
    orders: [],
    success: true,
    total: 12345,
    totalToday: 123,
}