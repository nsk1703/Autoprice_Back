import { paiementsConstants } from "../../constants/paiementConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const paiements = () => {

    return (dispatch) => {
        dispatch({
            type: paiementsConstants.ALL_PAIEMENTS_REQUEST
        });

        axios.get('/paiements')
        .then((response) => {
            console.log(response)
            if(response.data.success === true){
                const { paiements } = response.data;
                const paiementsCount = response.data.page_meta.total_items_count

                console.log(paiements)
                dispatch({
                    type: paiementsConstants.ALL_PAIEMENTS_SUCCESS,
                    payload: { paiements: paiements, paiementsCount: paiementsCount }
                })
            }else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    toast.error(response.data.full_messages[0]);

                    dispatch({
                        type: paiementsConstants.ALL_PAIEMENTS_FAIL,
                        payload: { error: response.data.full_messages[0] }
                    });
                }
            }
        })
    }
}