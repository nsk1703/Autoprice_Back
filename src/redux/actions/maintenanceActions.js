import { maintenanceConstants } from "../../constants/maintenanceConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const maintenances = () => {

    return (dispatch) => {
        dispatch({
            type: maintenanceConstants.ALL_MAINTENANCE_REQUEST
        });

        axios.get('/maintenances')
            .then((response) => {
                // console.log(response);
                if (response.data.success === true) {
                    const { maintenances } = response.data
                    const maintenancesCount = response.data.page_meta.total_items_count
                    
                    dispatch({
                        type: maintenanceConstants.ALL_MAINTENANCE_SUCCESS,
                        payload: { maintenances: maintenances, maintenancesCount: maintenancesCount }
                    });
                } else {
                    if (response.data.success === false) {
                        // console.log(response.data.full_messages[0])
                        toast.error(response.data.full_messages[0]);

                        dispatch({
                            type: maintenanceConstants.ALL_MAINTENANCE_FAIL,
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

export const newMaintenance = (maintenance) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: maintenanceConstants.NEW_MAINTENANCE_REQUEST
        });
        console.log(maintenance.machine_id)
        let body = {
            etat: "1",
            nom: maintenance.nom,
            type: maintenance.type['value'],
            dateMaintenance: maintenance.dateMaintenance,
            montant: parseInt(maintenance.montant, 10),
            description: maintenance.description,
            piece_id: maintenance.piece_id.value,
            machine_id: maintenance.machine_id.value,
            utilisateurid: localStorage.getItem('userid')
        }
        // console.log(body)
        const token = localStorage.getItem('token');
        let config = {
            headers: {
            'Content-Type': 'application/json',
            'USER-KEY': `Bearer ${token}`
            }
        }
        axios.post('/maintenance', body, config)
        .then((response) => {
            // console.log(response.data)
            if(response.data.success === true){
                const { success } = response.data
                // const MaintenanceCount = response.data.success
                
                dispatch({
                    type: maintenanceConstants.NEW_MAINTENANCE_SUCCESS,
                    payload: { success: success }
                })
                toast.success(response.data.full_messages[0])
            }
            else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    // const {success} = response.data
                    // toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: maintenanceConstants.NEW_MAINTENANCE_FAIL,
                        // payload: { success: success }
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

export const editMaintenance = (maintenance) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: maintenanceConstants.UPDATE_MAINTENANCE_REQUEST
        });
        // console.log(maintenance)
        // console.log(maintenance.machine_id.value)
        // console.log(maintenance.type.value)
        // console.log(maintenance.dateMaintenance)
        let body = {
            etat: "1",
            nom: maintenance.nom,
            type: maintenance.type.value,
            dateMaintenance: maintenance.dateMaintenance,
            montant: parseInt(maintenance.montant, 10),
            piece_id: maintenance.piece_id.value,
            description: maintenance.description,
            machine_id: maintenance.machine_id.value,
            utilisateurid: localStorage.getItem('userid')
        }
        // console.log(body)
        const token = localStorage.getItem('token');
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'USER-KEY': `Bearer ${token}`
            }
        }
        axios.put(`/maintenance/${maintenance.id}`, body, config)
        .then((response) => {
            console.log(response)
            if(response.data.success === true){
                const { success } = response.data
                // const MaintenanceCount = response.data.success
                
                dispatch({
                    type: maintenanceConstants.UPDATE_MAINTENANCE_SUCCESS,
                    payload: { isUpdated: success }
                })
                toast.success(response.data.full_messages[0])
            }
            else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    // const {success} = response.data
                    // toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: maintenanceConstants.UPDATE_MAINTENANCE_FAIL,
                        // payload: { success: success }
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

export const detailmaintenance = (mainId) => {

    return (dispatch) => {
        dispatch({
            type: maintenanceConstants.MAINTENANCE_DETAILS_REQUEST
        });

        axios.get(`/maintenance/${mainId}`)
            .then((response) => {
                // console.log(response);
                if (response.data.success === true) {
                    const maintenance  = response.data
                    
                    dispatch({
                        type: maintenanceConstants.MAINTENANCE_DETAILS_SUCCESS,
                        payload: { maintenance: maintenance }
                    });
                } else {
                    if (response.data.success === false) {

                        dispatch({
                            type: maintenanceConstants.MAINTENANCE_DETAILS_FAIL,
                            // payload: { error: success }
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