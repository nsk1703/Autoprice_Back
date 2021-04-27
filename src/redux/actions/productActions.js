import { productConstants } from "../../constants/productConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const products = () => {

    return (dispatch) => {
        dispatch({
            type: productConstants.ALL_PRODUCTS_REQUEST
        });

        axios.get('/products')
            .then((response) => {
                console.log(response);
                if (response.data.success === true) {
                    const { products } = response.data
                    const productsCount = response.data.page_meta.total_items_count
                    
                    dispatch({
                        type: productConstants.ALL_PRODUCTS_SUCCESS,
                        payload: { products: products, productsCount: productsCount }
                    });
                } else {
                    if (response.data.success === false) {
                        // console.log(response.data.full_messages[0])
                        toast.error(response.data.full_messages[0]);

                        dispatch({
                            type: productConstants.ALL_PRODUCTS_FAIL,
                            payload: { error: response.data.full_messages[0] }
                        });
                    }
                }
            })
            .catch((error) => {
                console.log("Oops, Request failed!");
            });
    }
}