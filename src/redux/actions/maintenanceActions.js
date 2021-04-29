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
                console.log(response);
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
        let body = {
            etat: "1",
            nom: maintenance.nom,
            type: maintenance.type['value'],
            dateMaintenance: maintenance.dateMaintenance,
            montant: parseInt(maintenance.montant, 10),
            description: maintenance.description,
            machine_id: maintenance.machine_id.value
        }
        console.log(body)
        const token = localStorage.getItem('token');
        let config = {
            headers: {
            'Content-Type': 'application/json',
            'USER-KEY': `Bearer ${token}`
            }
        }
        axios.post('/maintenance', body, config)
        .then((response) => {
            console.log(response.data)
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