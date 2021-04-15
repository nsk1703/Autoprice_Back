// import { authConstants } from "../../constants/userConstants";
// import axios from "axios";
// import { toast } from 'react-toastify';

// export const login = (user) => {
//     console.log("test ", user);

//     return async (dispatch) => {
//         dispatch({
//             type: authConstants.LOGIN_REQUEST
//         });

//         await axios.post('/login', {
//             ...user,
//         })
//         .then((response) => {
//             if(response.data.success === true){
//                 const { token, user, roles } = response.data;
//                 localStorage.setItem('token', user.token);
//                 localStorage.setItem('user', JSON.stringify(user.username));
//                 localStorage.setItem('roles', user.roles);
//                 toast.success("Successfully Connected !");
//                 dispatch({
//                     type: authConstants.LOGIN_SUCCESS,
//                     payload: { token, user, roles }
//                 });
//             }else{
//                 if (response.data.success === false) {
//                     // console.log(response.data.full_messages[0])
//                     toast.error(response.data.full_messages[0]);

//                     dispatch({
//                         type: authConstants.LOGIN_FAIL,
//                         payload: { message: response.data.full_messages[0] }
//                     });
//                 } 
//             }
//         })
//         .catch((error) => {
//             console.log("Oops, Request failed!");
//         });
//     }
// }
