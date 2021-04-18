import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS } from "../../constants/ordersConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const listOrders = () => {

    return (dispatch) => {
        dispatch({
            type: ALL_ORDERS_REQUEST
        });

        axios.get('/orders')
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    dispatch({
                        type: ALL_ORDERS_SUCCESS,
                        payload: { orders: response.data.orders, ordersCount: response.data.page_meta.total_items_count }
                    });
                } else {
                    if (response.data.success === false) {
                        // console.log(response.data.full_messages[0])
                        toast.error(response.data.full_messages[0]);

                        dispatch({
                            type: ALL_ORDERS_FAIL,
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