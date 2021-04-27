import { remboursementConstants } from "../../constants/remboursementConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const remboursements = () => {

    return (dispatch) => {
        dispatch({
            type: remboursementConstants.ALL_REMBOURSEMENT_REQUEST
        });

        axios.get('/remboursements')
        .then((response) => {
            // console.log(response.data)
            if(response.data.success === true){
                const { remboursements } = response.data;
                console.log(remboursements)
                const remboursementsCount = response.data.page_meta.total_items_count
                dispatch({
                    type: remboursementConstants.ALL_REMBOURSEMENT_SUCCESS,
                    payload: { remboursements: remboursements, remboursementsCount: remboursementsCount }
                })
                // console.log(remboursements)
            }else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    const error =  response.data.full_messages[0]
                    dispatch({
                        type: remboursementConstants.ALL_REMBOURSEMENT_FAIL,
                        payload: { error: error}
                    });
                    toast.error(error);

                }
            }
        })
        .catch((error) => {
            console.log("Oops, Request failed!");
        });
    }
}