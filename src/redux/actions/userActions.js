import { authConstants } from "../../constants/userConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const login = (user) => {
    console.log("test ", user);

    return (dispatch) => {
        dispatch({
            type: authConstants.LOGIN_REQUEST
        });

        axios.post('/login', {
            ...user,
        })
        .then((response) => {
            if(response.data.success === true){
                const lastToken = localStorage.getItem('token')
                if(lastToken !== null) {
                    localStorage.removeItem('token')
                }
                const { token, user } = response.data;
                const roles = response.data.user.roles
                console.log(token)
                
                localStorage.setItem('token', response.data.user.token);
                console.log(token)
                localStorage.setItem('user', response.data.user.username);
                localStorage.setItem('roles', response.data.user.roles);
                toast.success("Successfully Connected !");
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: { token: token, user: user, roles: roles }
                });
            }else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    toast.error(response.data.full_messages[0]);

                    dispatch({
                        type: authConstants.LOGIN_FAIL,
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

export const register = (user) => {
    
    return (dispatch) => {
        dispatch({ 
            type: authConstants.REGISTER_USER_REQUEST
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
                    type: authConstants.REGISTER_USER_SUCCESS
                });
                toast.success(response.data.full_messages[0]+ '. Please log in!')
            }else {
                if(response.data.success === false){
                    dispatch({ 
                        type: authConstants.REGISTER_USER_FAIL
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
        //         type: authConstants.REGISTER_USER_SUCCESS
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
        //     type: authConstants.REGISTER_USER_SUCCESS,
        //     payload: message,
        // });
        // } else {
        // if (res.status === 400) {
        //     dispatch({
        //     type: authConstants.SIGNUP_FAILURE,
        //     payload: { error: res.data.error },
        //     });
        // }
        // }
    };
}
