import React,{useState,createContext, useEffect} from "react";

const ShoppingCartContext = createContext({});



const localStorageShoppingCart = () => {
    const localStorageShoppingCart = localStorage.getItem("shoppingCart");
    return localStorageShoppingCart ? JSON.parse(localStorageShoppingCart) : [];
}

export const ShoppingCartProvider = ({children}) => {
    const [shoppingCart, setShoppingCart] = useState(localStorageShoppingCart());
    const [orderProductPairList, setOrderProductPairList] = useState([]);

    const addOrderProductPair = (orderProductPair) => {
        setOrderProductPairList((prevOrderProductPairList) => [
            ...prevOrderProductPairList,
            orderProductPair,
        ]);
    };

    const handleOrderProductPairList = (newOrderProductList) => {
        setOrderProductPairList(newOrderProductList);
    }

    const getUpdatedStock = (productId, oldStock) => {
        const getProductStockInCart = () => {
            let totalStock = 0;
            for (const pair of orderProductPairList) {
                const [product, _] = pair;
                if (product.product_id === productId) {
                    totalStock += product.product_amount;
                }
            }
            return totalStock;
        };

        return oldStock - getProductStockInCart();
    };

    useEffect(() => {
        localStorage.setItem(shoppingCart,JSON.stringify(shoppingCart));   
    },[shoppingCart]);

    return (
        <ShoppingCartContext.Provider value={{
            shoppingCart,
            setShoppingCart,
            orderProductPairList,
            setOrderProductPairList,
            addOrderProductPair,
            handleOrderProductPairList,
            getUpdatedStock}}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartContext;


