import { categoriesConstants } from "../../constants/categoryConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const categories = () => {

    return (dispatch) => {
        dispatch({
            type: categoriesConstants.ALL_CATEGORY_REQUEST
        });

        axios.get('/categories')
            .then((response) => {
                console.log(response.data);
                if (response.data.success === true) {
                    const {categories} = response.data
                    const categoriesCount = response.data.page_meta.total_items_count
                    dispatch({
                        type: categoriesConstants.ALL_CATEGORY_SUCCESS,
                        payload: { categories: categories, categoriesCount: categoriesCount }
                    });
                } else {
                    if (response.data.success === false) {
                        // console.log(response.data.full_messages[0])
                        toast.error(response.data.full_messages[0]);

                        dispatch({
                            type: categoriesConstants.ALL_CATEGORY_FAIL,
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