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

export const newSlide = (slide) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: slideConstants.NEW_SLIDE_REQUEST
        });
        console.log(slide.format.value)
        console.log(slide.type.value)

        let formData = new FormData();
        formData.append('type', slide.type.value);
        formData.append('format', slide.format.value);
        formData.append('images', slide.images);

        console.log(formData)
        const token = localStorage.getItem('token');
        let config = {
            headers: {
                'Content-type': 'multipart/form-data',
                'USER-KEY': `Bearer ${token}`
            }
        }
        axios.post('/slide', formData, config)
        .then((response) => {
            console.log(response.data)
            if(response.data.success === true){
                const { success } = response.data
                
                dispatch({
                    type: slideConstants.NEW_SLIDE_SUCCESS,
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
                        type: slideConstants.NEW_SLIDE_FAIL,
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