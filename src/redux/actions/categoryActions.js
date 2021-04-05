import { ALL_CATEGORY_FAIL, ALL_CATEGORY_REQUEST, ALL_CATEGORY_SUCCESS } from "../../constants/categoryConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const listCategories = () => {

    return (dispatch) => {
        dispatch({
            type: ALL_CATEGORY_REQUEST
        });

        axios.get('/categories')
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    dispatch({
                        type: ALL_CATEGORY_SUCCESS,
                        payload: { categories: response.data.categories, categoriesCount: response.data.page_meta.total_items_count }
                    });
                } else {
                    if (response.data.success === false) {
                        // console.log(response.data.full_messages[0])
                        toast.error(response.data.full_messages[0]);

                        dispatch({
                            type: ALL_CATEGORY_FAIL,
                            payload: { message: response.data.full_messages[0] }
                        });
                    }
                }
            })
            .catch((error) => {
                console.log("Oops, Request failed!");
            });
    }
}