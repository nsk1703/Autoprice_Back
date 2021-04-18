import { ALL_REMBOURSEMENT_FAIL, ALL_REMBOURSEMENT_REQUEST, ALL_REMBOURSEMENT_SUCCESS } from "../../constants/remboursementConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const listRemboursements = () => {

    return (dispatch) => {
        dispatch({
            type: ALL_REMBOURSEMENT_REQUEST
        });

        axios.get('/remboursements')
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    dispatch({
                        type: ALL_REMBOURSEMENT_SUCCESS,
                        payload: { remboursements: response.data.remboursements, remboursementsCount: response.data.page_meta.total_items_count }
                    });
                } else {
                    if (response.data.success === false) {
                        // console.log(response.data.full_messages[0])
                        toast.error(response.data.full_messages[0]);

                        dispatch({
                            type: ALL_REMBOURSEMENT_FAIL,
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