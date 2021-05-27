import { logsConstants } from "../../constants/logsConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const logs = () => {

    return (dispatch) => {
        dispatch({
            type: logsConstants.ALL_LOGS_REQUEST
        });

        axios.get('/logs')
            .then((response) => {
                console.log(response);
                if (response.data.success === true) {
                    const { logss } = response.data
                    const logsCount = response.data.page_meta.total_items_count
                    
                    dispatch({
                        type: logsConstants.ALL_LOGS_SUCCESS,
                        payload: { logss: logss, logsCount: logsCount }
                    });
                } else {
                    if (response.data.success === false) {
                        // console.log(response.data.full_messages[0])
                        toast.error(response.data.full_messages[0]);

                        dispatch({
                            type: logsConstants.ALL_LOGS_FAIL,
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
