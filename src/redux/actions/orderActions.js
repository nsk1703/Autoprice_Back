import { ordersConstants } from "../../constants/ordersConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const orders = () => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: ordersConstants.ALL_ORDERS_REQUEST
        });

        axios.get('/orders')
        .then((response) => {
            if(response.data.success === true){
                // console.log(response)
                const {orders} = response.data
                const ordersCount = response.data.page_meta.total_items_count
                dispatch({
                    type: ordersConstants.ALL_ORDERS_SUCCESS,
                    payload: {orders: orders, ordersCount: ordersCount}
                })
            }else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: ordersConstants.ALL_ORDERS_FAIL,
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

