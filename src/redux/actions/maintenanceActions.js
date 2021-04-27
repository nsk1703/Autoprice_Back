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
            type: maintenanceConstants.NEW_Maintenance_REQUEST
        });
        let body = {
            etat: "1",
            nom: maintenance.nom,
            type: maintenance.type,
            dateMaintenance: maintenance.dateMaintenance,
            montant: maintenance.montant,
            description: maintenance.description,
            machine_id: maintenance.machine_id
        }
        console.log(body)
        const token = localStorage.getItem('token');
        axios.post('/maintenance', body,
            {headers: {
                'USER-KEY': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data)
            if(response.data.success === true){
                const { maintenance, success } = response.data
                // const MaintenanceCount = response.data.success
                
                dispatch({
                    type: maintenanceConstants.NEW_Maintenance_SUCCESS,
                    payload: {maintenance: maintenance, success: success, token: token }
                })
                toast.success(response.data.full_messages[0])
            }
            else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    const {success} = response.data
                    toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: maintenanceConstants.NEW_Maintenance_FAIL,
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