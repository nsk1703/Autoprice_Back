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

export const newCategory = (category) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: categoriesConstants.NEW_CATEGORY_REQUEST
        });
        // console.log(category)
        let formData = new FormData();
        formData.append('name', category.nom);
        formData.append('description', category.description);
        formData.append('files', category.files);

        const token = localStorage.getItem('token');
        console.log(token)
        let config = {
            headers: {
              'USER-KEY': `Bearer ${token}`,
              'Content-type': 'multipart/form-data'
            }
          }

        console.log( 'asss', token)
        axios.post('/category', formData, config)
        .then((response) => {
            // console.log(response)
            if(response.data.success === true){
                const {success} = response.data
                // const CategoryCount = response.data.success
                // console.log(Category)
                console.log(success)
                dispatch({
                    type: categoriesConstants.NEW_CATEGORY_SUCCESS,
                    payload: { success: success }
                })
                toast.success('Ajouter avec succes!!')
            }
            else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    // const {success} = response.data
                    // toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: categoriesConstants.NEW_CATEGORY_FAIL
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