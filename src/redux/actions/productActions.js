import { ALL_PRODUCTS_FAIL, ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS } from "../../constants/productConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const listProducts = () => {

    return (dispatch) => {
        dispatch({
            type: ALL_PRODUCTS_REQUEST
        });

        axios.get('/products')
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    dispatch({
                        type: ALL_PRODUCTS_SUCCESS,
                        payload: { products: response.data.products, productsCount: response.data.page_meta.total_items_count }
                    });
                } else {
                    if (response.data.success === false) {
                        // console.log(response.data.full_messages[0])
                        toast.error(response.data.full_messages[0]);

                        dispatch({
                            type: ALL_PRODUCTS_FAIL,
                            payload: { message: response.data.full_messages[0] }
                        });
                    }
                }
            })
            .catch((error) => {
                console.log("Oops, Request failed!");
            });
    }
}