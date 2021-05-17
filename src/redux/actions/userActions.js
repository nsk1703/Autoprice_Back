import { userConstants } from "../../constants/userConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const login = (user) => {
    console.log("test ", user);

    return (dispatch) => {
        dispatch({
            type: userConstants.LOGIN_REQUEST
        });

        axios.post('/login', {
            ...user,
        })
        .then((response) => {
            if(response.data.success === true){
                console.log(response.data)
                const { token, user } = response.data;
                const roles = response.data.user.roles[0]
                // console.log(token)

                console.log('roro',roles)
                
                localStorage.setItem('token', response.data.user.token);
                // console.log(token)
                localStorage.setItem('user', response.data.user.username);
                localStorage.setItem('roles', response.data.user.roles);
                
                // let config = {
                //     headers: {
                //       'USER-KEY': `Bearer ${token}`,
                //       'Content-Type': 'application/json'
                //     }
                // }
                // axios.get(`/role_name`, {role: roles}, config)
                //     .then((response) => {
                //         console.log(response.data)
                //     })
                dispatch({
                    type: userConstants.LOGIN_SUCCESS,
                    payload: { token: token, user: user, roles: roles }
                });
                toast.success("Successfully Connected !");
            }else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    toast.error(response.data.full_messages[0]);

                    dispatch({
                        type: userConstants.LOGIN_FAIL,
                        payload: { message: response.data.full_messages[0] }
                    });
                } 
            }
        })
        .catch((error) => {
            localStorage.clear();
            console.log("Oops, Request failed!");
        });
    }
}

export const register = (user) => {
    
    return (dispatch) => {
        dispatch({ 
            type: userConstants.REGISTER_USER_REQUEST
        });
        // console.log(user);
        let body = {
            etat: "1",
            active: "1",
            username: user.username,
            email: user.email,
            password: user.password,
            password_confirmation: user.confirm_password
        }
        // console.log(" user ", body);
        axios.post('/register', body, 
        {headers: {"Content-Type": "application/json"}
        }).then((response) =>{
            if(response.data.success === true){
                dispatch({ 
                    type: userConstants.REGISTER_USER_SUCCESS
                });
                toast.success(response.data.full_messages[0]+ '. Please log in!')
            }else {
                if(response.data.success === false){
                    dispatch({ 
                        type: userConstants.REGISTER_USER_FAIL
                    });
                    for(var i=0; response.data.full_messages[i]; i++){
                        toast.error(response.data.full_messages[i])
                    }
                }
            }
        }).catch((err) =>{
            console.log(err)
        })
        // console.log(res.status)
        // if(res.status === 200){
        //     dispatch({ 
        //         type: userConstants.REGISTER_USER_SUCCESS
        //     });
        //     toast.success(res.data.full_messages[0])
        // }else{
        //     console.log(res);
        //     // if(res.status === 422){
        //     //     console.log(res);
        //     //     // var full_messages = res.data.full_messages;
        //     //     // console.log(full_messages)
                // for(var i=0; res.data.full_messages[i]; i++){
                //     toast.error(res.data.full_messages[i])
                // }
        //     // }
        // }
        
       


        // if (res.status === 201) {
        // const { message } = res.data;
        // dispatch({
        //     type: userConstants.REGISTER_USER_SUCCESS,
        //     payload: message,
        // });
        // } else {
        // if (res.status === 400) {
        //     dispatch({
        //     type: userConstants.SIGNUP_FAILURE,
        //     payload: { error: res.data.error },
        //     });
        // }
        // }
    };
}

export const users = () => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: userConstants.ALL_USERS_REQUEST
        });

        const token = localStorage.getItem('token');
        let config = {
            headers: {
              'USER-KEY': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }

        axios.get('/users', config)
        .then((response) => {
            console.log(response)
            if(response.data.success === true){
                const {users} = response.data
                // const usersCount = response.data.page_meta.total_items_count
                dispatch({
                    type: userConstants.ALL_USERS_SUCCESS,
                    payload: {users: users}
                })
            }
            else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: userConstants.ALL_USERS_FAIL,
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

export const newUser = (user) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: userConstants.NEW_USERS_REQUEST
        });

        // console.log(user)
        let body = {
            etat: user.etat,
            active:"1",
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            roles: user.role_id.value,
            password: user.password,
            password_confirmation: user.confirm_password
        }

        console.log(body)
        const token = localStorage.getItem('token');
        let config = {
            headers: {
              'USER-KEY': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }

        axios.post('/utilisateur', body, config)
            .then((response) => {
                console.log(response)
                if(response.data.success === true){
                    const {success} = response.data

                    dispatch({
                        type: userConstants.NEW_USERS_SUCCESS,
                        payload: {success: success}
                    })
                    toast.success(response.data.full_messages[0])
                }else{
                    if (response.data.success === false) {
                        // console.log(response.data.full_messages[0])
                        dispatch({
                            type: userConstants.NEW_USERS_FAIL,
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

export const editUser = (user) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: userConstants.UPDATE_USER_REQUEST
        });
        // console.log(user)
    //     let body = {
    //         etat: "1",
    //         machine_id: user.machine_id.value,
    //         description: user.description,
    //         quantite: parseInt(user.quantite, 10)
    //     }
    //     const token = localStorage.getItem('token');
    //     let config = {
    //         headers: {
    //           'USER-KEY': `Bearer ${token}`,
    //           'Content-Type': 'application/json'
    //         }
    //       }
    //     // console.log(body)
    // //     // console.log( 'asss', token)
    //     axios.put(`/user/${user.id}`, body, config)
    //     .then((response) => {
    //         // console.log(response)
    //         if(response.data.success === true){
    //             const {success} = response.data
        
    //             dispatch({
    //                 type: userConstants.UPDATE_USER_SUCCESS,
    //                 payload: { isUpdated: success }
    //             })
    //             toast.success('Modifier avec succes!!')
    //         }
    //         else{
    //             if (response.data.success === false) {
    //                 dispatch({
    //                     type: userConstants.UPDATE_USER_FAIL
    //                     // payload: { error: response.data.full_messages[0] }
    //                 });
    //                 for(var i=0; i<response.data.full_messages[i]; i++){
    //                     toast.error(response.data.full_messages[i])
    //                 }
    //             }
    //         }
    //     })
    //     .catch((error) => {
    //         console.log("Oops, Request failed!");
    //     });

    }
}

export const detailUser = (userId) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: userConstants.USER_DETAILS_REQUEST
        });

    //     // console.log(userId)
        axios.get(`/user/${userId}`)
        .then((response) => {
            console.log(response.data)
    //         if(response.data.success === true){
    //             const user = response.data
    //                 // console.log(user)
    //             dispatch({
    //                 type: userConstants.USER_DETAILS_SUCCESS,
    //                 payload: {user: user}
    //             })
    //         }else{
    //             if (response.data.success === false) {
    //                 // console.log(response.data.full_messages[0])
    //                 toast.error(response.data.full_messages[0]);
    //                 dispatch({
    //                     type: userConstants.USER_DETAILS_FAIL,
    //                     payload: { error: response.data.full_messages[0] }
    //                 });
    //             }
    //         }
        })
        .catch((error) => {
            console.log("Oops, Request failed!");
        });

    }
}




