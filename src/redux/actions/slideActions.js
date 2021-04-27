import { slideConstants } from "../../constants/slideConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const slides = () => {

    return (dispatch) => {
        dispatch({
            type: slideConstants.ALL_SLIDES_REQUEST
        });

        axios.get('/slides')
            .then((response) => {
                console.log(response);
                if (response.data.success === true) {
                    const { slidess } = response.data
                    const slidesCount = response.data.page_meta.total_items_count
                    
                    dispatch({
                        type: slideConstants.ALL_SLIDES_SUCCESS,
                        payload: { slides: slidess, slidesCount: slidesCount }
                    });
                } else {
                    if (response.data.success === false) {
                        // console.log(response.data.full_messages[0])
                        toast.error(response.data.full_messages[0]);

                        dispatch({
                            type: slideConstants.ALL_SLIDES_FAIL,
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