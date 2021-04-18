import { ALL_PAIEMENT_FAIL, ALL_PAIEMENT_REQUEST, ALL_PAIEMENT_SUCCESS } from "../../constants/paiementConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const listPaiements = () => {

    return (dispatch) => {
        dispatch({
            type: ALL_PAIEMENT_REQUEST
        });

        axios.get('/paiements')
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    dispatch({
                        type: ALL_PAIEMENT_SUCCESS,
                        payload: { paiements: response.data.paiements, paiementsCount: response.data.page_meta.total_items_count }
                    });
                } else {
                    if (response.data.success === false) {
                        // console.log(response.data.full_messages[0])
                        toast.error(response.data.full_messages[0]);

                        dispatch({
                            type: ALL_PAIEMENT_FAIL,
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