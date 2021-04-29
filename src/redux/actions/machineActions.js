import { machineConstants } from "../../constants/machineConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const machines = () => {

    return (dispatch) => {
        dispatch({
            type: machineConstants.ALL_MACHINE_REQUEST
        });

        axios.get('/machines')
            .then((response) => {
                console.log(response);
                if (response.data.success === true) {
                    const { machines } = response.data
                    const machinesCount = response.data.page_meta.total_items_count
                    // console.log(machines)
                    dispatch({
                        type: machineConstants.ALL_MACHINE_SUCCESS,
                        payload: { machines: machines, machinesCount: machinesCount }
                    });
                } else {
                    if (response.data.success === false) {
                        // console.log(response.data.full_messages[0])
                        toast.error(response.data.full_messages[0]);

                        dispatch({
                            type: machineConstants.ALL_MACHINE_FAIL,
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

export const newMachine = (machine) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: machineConstants.NEW_MACHINE_REQUEST
        });
        let body = {
            etat: "1",
            status: "1",
            nom: machine.nom,
            type: machine.type['value'],
            lien: machine.lien,
            montant: parseInt(machine.montant,10),
            description: machine.description,
        }
        console.log(body)
        const token = localStorage.getItem('token');
        let config = {
            headers: {
            'Content-Type': 'application/json',
            'USER-KEY': `Bearer ${token}`
            }
        }
        axios.post('/machine', body, config)
        .then((response) => {
            console.log(response.data)
            if(response.data.success === true){
                const { success } = response.data
                
                dispatch({
                    type: machineConstants.NEW_MACHINE_SUCCESS,
                    payload: {success: success }
                })
                toast.success(response.data.full_messages[0])
            }
            else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    // const {success} = response.data
                    // toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: machineConstants.NEW_MACHINE_FAIL,
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