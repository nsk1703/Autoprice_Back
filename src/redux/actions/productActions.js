import { productConstants } from "../../constants/productConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const products = () => {

    return (dispatch) => {
        dispatch({
            type: productConstants.ALL_PRODUCTS_REQUEST
        });

        axios.get('/products')
            .then((response) => {
                console.log(response);
                if (response.data.success === true) {
                    const { products } = response.data
                    const productsCount = response.data.page_meta.total_items_count
                    
                    dispatch({
                        type: productConstants.ALL_PRODUCTS_SUCCESS,
                        payload: { products: products, productsCount: productsCount }
                    });
                } else {
                    if (response.data.success === false) {
                        // console.log(response.data.full_messages[0])
                        toast.error(response.data.full_messages[0]);

                        dispatch({
                            type: productConstants.ALL_PRODUCTS_FAIL,
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

export const newProduct = (product) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: productConstants.NEW_PRODUCT_REQUEST
        });
        
        console.log(product.images)
        console.log(product.category_id)

        let formData = new FormData();
        formData.append('etat', 1);
        formData.append('status', 1);
        formData.append('name', product.nom);
        formData.append('unit', product.unite);
        formData.append('reference', product.reference);
        formData.append('price', parseInt(product.price));
        formData.append('quantite', parseInt(product.quantite));
        formData.append('description', product.description);
        formData.append('machineId', product.machine_id.value);
        formData.append('category', product.category_id.label);
        formData.append('images', product.images);

        console.log(formData)

        const token = localStorage.getItem('token');
        // console.log(token)
        let config = {
            headers: {
              'USER-KEY': `Bearer ${token}`,
              'Content-type': 'multipart/form-data'
            }
          }

        // // console.log( 'asss', token)
        axios.post('/product', formData, config)
        .then((response) => {
            console.log(response)
            if(response.data.success === true){
                const {success} = response.data
                // const productCount = response.data.success
                // console.log(product)
                console.log(success)
                dispatch({
                    type: productConstants.NEW_PRODUCT_SUCCESS,
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
                        type: productConstants.NEW_PRODUCT_FAIL
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