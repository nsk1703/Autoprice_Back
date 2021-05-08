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
            productId: produit.product_id.value,
            description: produit.description,
            quantite: parseInt(produit.quantite, 10)
        }
        
        console.log(body)
        const token = localStorage.getItem('token');
        let config = {
            headers: {
              'USER-KEY': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        axios.post('/approproduit', body, config)
        .then((response) => {
            console.log(response.data)
            if(response.data.success === true){
                const { success } = response.data
                // const approproduitsCount = response.data.success
                
                dispatch({
                    type: approproduitConstants.NEW_APPROPRODUIT_SUCCESS,
                    payload: { success: success }
                })
                toast.success('Ajouter avec succes!!')
            }
            else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    // const {error} = response.data
                    toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: approproduitConstants.NEW_APPROPRODUIT_FAIL,
                        // payload: { error: response.data.full_messages[0] }
                    });
                    for(var i=0; i<response.data.full_messages[i]; i++){
                        toast.error(response.data.full_messages[i])
                    }
                }
            }
        })
        .catch((error) => {
            console.log("Oops, Request failed!");
        });

    }
}

export const editApproproduits = (produit) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: approproduitConstants.UPDATE_APPROPRODUIT_REQUEST
        });
        console.log(produit)
        let body = {
            etat: "1",
            productId: produit.productId.value,
            description: produit.description,
            quantite: parseInt(produit.quantite, 10)
        }
        
        console.log(body)
        const token = localStorage.getItem('token');
        let config = {
            headers: {
              'USER-KEY': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        axios.put(`/approproduit/${produit.id}`, body, config)
        .then((response) => {
            console.log(response)
            if(response.data.success === true){
                const { success } = response.data
                
                dispatch({
                    type: approproduitConstants.UPDATE_APPROPRODUIT_SUCCESS,
                    payload: { isUpdated: success }
                })
                toast.success('Modifier avec succes!!')
            }
            else{
                if (response.data.success === false) {
                    // console.log(response.data)
                    // const {error} = response.data
                    // toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: approproduitConstants.UPDATE_APPROPRODUIT_FAIL,
                        // payload: { error: response.data.full_messages[0] }
                    });
                    for(var i=0; i<response.data.full_messages[i]; i++){
                        toast.error(response.data.full_messages[i])
                    }
                }
            }
        })
        .catch((error) => {
            console.log("Oops, Request failed!");
        });

    }
}

export const detailApproproduit = (productId) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: approproduitConstants.APPROPRODUIT_DETAILS_REQUEST
        });

        // console.log(productId)
        axios.get(`/approproduit/${productId}`)
        .then((response) => {
            // console.log(response.data)
            if(response.data.success === true){
                const approproduit = response.data
                    console.log(approproduit)

                dispatch({
                    type: approproduitConstants.APPROPRODUIT_DETAILS_SUCCESS,
                    payload: {approproduit: approproduit}
                })
            }else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: approproduitConstants.APPROPRODUIT_DETAILS_FAIL,
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