import { ALL_TRANSACTIONOM_FAIL, ALL_TRANSACTIONOM_REQUEST, ALL_TRANSACTIONOM_SUCCESS } from "../../constants/transactionomConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const listTransactions = () => {

    return (dispatch) => {
        dispatch({
            type: ALL_TRANSACTIONOM_REQUEST
        });

        axios.get('/transactionoms')
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    dispatch({
                        type: ALL_TRANSACTIONOM_SUCCESS,
                        payload: { transactionoms: response.data.transactionoms, transactionomsCount: response.data.page_meta.total_items_count }
                    });
                } else {
                    if (response.data.success === false) {
                        // console.log(response.data.full_messages[0])
                        toast.error(response.data.full_messages[0]);

                        dispatch({
                            type: ALL_TRANSACTIONOM_FAIL,
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