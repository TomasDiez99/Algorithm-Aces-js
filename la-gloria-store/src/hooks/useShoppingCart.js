import {useContext} from "react";
import ShoppingCartContext from "../context/ShoppingCartProvider";

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext);
};