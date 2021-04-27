import { approproduitConstants } from "../../constants/approproduitConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const approproduits = () => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: approproduitConstants.ALL_APPROPRODUIT_REQUEST
        });

        axios.get('/approproduits')
        .then((response) => {
            // console.log(response.data)
            if(response.data.success === true){

                const {approproduits} = response.data
                const approproduitsCount = response.data.page_meta.total_items_count

                dispatch({
                    type: approproduitConstants.ALL_APPROPRODUIT_SUCCESS,
                    payload: {approproduits: approproduits, approproduitsCount: approproduitsCount}
                })
            }else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: approproduitConstants.ALL_APPROPRODUIT_FAIL,
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

export const newApproproduits = (produit) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: approproduitConstants.NEW_APPROPRODUIT_REQUEST
        });
        let body = {
            etat: "1",
            machine_id: produit.machine,
            description: produit.description,
            quantite: produit.montant
        }
        console.log(body)
        const token = localStorage.getItem('token');
        axios.post('/approproduit', body,
            {headers: {
                'USER-KEY': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data)
            if(response.data.success === true){
                const {approproduits, success} = response.data
                // const approproduitsCount = response.data.success
                
                dispatch({
                    type: approproduitConstants.NEW_APPROproduit_SUCCESS,
                    payload: {approproduit: approproduits, success: success, token: token }
                })
                toast.success('Ajouter avec succes!!')
            }
            else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    const {success} = response.data
                    toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: approproduitConstants.NEW_APPROproduit_FAIL,
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