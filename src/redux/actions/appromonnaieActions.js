import { appromonnaieConstants } from "../../constants/appromonnaieConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const appromonnaies = () => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: appromonnaieConstants.ALL_APPROMONNAIE_REQUEST
        });

        axios.get('/appromonnaies')
        .then((response) => {
            console.log(response)
            if(response.data.success === true){
                const {appromonnaies} = response.data
                const appromonnaiesCount = response.data.page_meta.total_items_count
                dispatch({
                    type: appromonnaieConstants.ALL_APPROMONNAIE_SUCCESS,
                    payload: {appromonnaies: appromonnaies, appromonnaiesCount: appromonnaiesCount}
                })
            }
            else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: appromonnaieConstants.ALL_APPROMONNAIE_FAIL,
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

export const newAppromonnaies = (monnaie) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: appromonnaieConstants.NEW_APPROMONNAIE_REQUEST
        });
        let body = {
            etat: "1",
            machine_id: monnaie.machine_id,
            description: monnaie.description,
            quantite: monnaie.montant
        }
        console.log(body)
        const token = localStorage.getItem('token');
        // console.log( 'asss', token)
        axios.post('/appromonnaie', body,
            {headers: {
                'USER-KEY': `Bearer ${token}`,
                'Content-Type': 'application/json'
                
            }
        })
        .then((response) => {
            console.log(response)
            if(response.data.success === true){
                const {appromonnaies, success} = response.data
                // const appromonnaiesCount = response.data.success
                
                dispatch({
                    type: appromonnaieConstants.NEW_APPROMONNAIE_SUCCESS,
                    payload: {appromonnaie: appromonnaies, success: success, token: token }
                })
                toast.success('Ajouter avec succes!!')
            }
            else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    const {success} = response.data
                    toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: appromonnaieConstants.NEW_APPROMONNAIE_FAIL,
                        payload: { success: success }
                    });
                }
            }
        })
        .catch((error) => {
            console.log("Oops, Request failed!");
        });

    }
}