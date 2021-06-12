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
            // console.log(response)
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
        // console.log(monnaie.machine_id.value)
        let body = {
            etat: "1",
            machine_id: monnaie.machine_id.value,
            description: monnaie.description,
            quantite: parseInt(monnaie.quantite, 10),
            utilisateurid: localStorage.getItem('userid')
        }
        const token = localStorage.getItem('token');
        let config = {
            headers: {
              'USER-KEY': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        // console.log(body)
        // console.log( 'asss', token)
        axios.post('/appromonnaie', body, config)
        .then((response) => {
            // console.log(response)
            if(response.data.success === true){
                const {appromonnaies, success} = response.data
                // const appromonnaiesCount = response.data.success
                // console.log(appromonnaies)
                // console.log(success)
                dispatch({
                    type: appromonnaieConstants.NEW_APPROMONNAIE_SUCCESS,
                    payload: { appromonnaie: appromonnaies, success: success }
                })
                toast.success('Ajouter avec succes!!')
            }
            else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    // const {success} = response.data
                    // toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: appromonnaieConstants.NEW_APPROMONNAIE_FAIL
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

export const editAppromonnaie = (money) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: appromonnaieConstants.UPDATE_APPROMONNAIE_REQUEST
        });
        // console.log(money)
        let body = {
            etat: "1",
            machine_id: money.machine_id.value,
            description: money.description,
            quantite: parseInt(money.quantite, 10),
            utilisateurid: localStorage.getItem('userid')

        }
        const token = localStorage.getItem('token');
        let config = {
            headers: {
              'USER-KEY': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        // console.log(body)
    //     // console.log( 'asss', token)
        axios.put(`/appromonnaie/${money.id}`, body, config)
        .then((response) => {
            // console.log(response)
            if(response.data.success === true){
                const {success} = response.data
        
                dispatch({
                    type: appromonnaieConstants.UPDATE_APPROMONNAIE_SUCCESS,
                    payload: { isUpdated: success }
                })
                toast.success('Modifier avec succes!!')
            }
            else{
                if (response.data.success === false) {
                    dispatch({
                        type: appromonnaieConstants.UPDATE_APPROMONNAIE_FAIL
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

export const detailAppromonnaie = (moneyId) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: appromonnaieConstants.APPROMONNAIE_DETAILS_REQUEST
        });

        // console.log(moneyId)
        axios.get(`/appromonnaie/${moneyId}`)
        .then((response) => {
            // console.log(response.data)
            if(response.data.success === true){
                const appromonnaie = response.data
                    // console.log(appromonnaie)
                dispatch({
                    type: appromonnaieConstants.APPROMONNAIE_DETAILS_SUCCESS,
                    payload: {appromonnaie: appromonnaie}
                })
            }else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: appromonnaieConstants.APPROMONNAIE_DETAILS_FAIL,
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