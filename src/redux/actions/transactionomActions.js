import { transactionsConstants } from "../../constants/transactionomConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const transactions = () => {

    return (dispatch) => {
        dispatch({
            type: transactionsConstants.ALL_TRANSACTIONOM_REQUEST
        });

        axios.get('/transactionoms')
            .then((response) => {
                console.log(response);
                if (response.data.success === true) {
                    
                    dispatch({
                        type: transactionsConstants.ALL_TRANSACTIONOM_SUCCESS,
                        payload: { transactionoms: response.data.transactionoms, transactionomsCount: response.data.page_meta.total_items_count }
                    });
                } else {
                    if (response.data.success === false) {
                        // console.log(response.data.full_messages[0])
                        toast.error(response.data.full_messages[0]);

                        dispatch({
                            type: transactionsConstants.ALL_TRANSACTIONOM_FAIL,
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