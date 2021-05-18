import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { actionsdetailRole } from "../../redux/actions/roleActions"
import { useDispatch, useSelector } from "react-redux";

export const PrivateRouteListAppromonnaie = ({component: Component, ...rest}) => {
    const roledetails = useSelector((state) => state.roledetails)
    const dispatch = useDispatch();
    const role = localStorage.getItem('roles');

    let rolers = []
    let roles = []

    useEffect(() => {
        dispatch(actionsdetailRole(role))
        // console.log(roledetails)
        
        setTimeout(() => {
            console.log(roledetails)
            // roledetails.role[0].map(rl => {
            //     console.log(rl)
            // })
        }, 1000)
    }, [])

  
    return (
        <Route
            {...rest}
                render = {(props) => {
                    const token = localStorage.getItem('token');
                    // console.log(roledetails.role[0])

                    
                    if(token) {
                        return (
                            <Component {...props} />
                        ) 
                    }else{
                        return <Redirect to='/login' />
                    }

                    // return <Component {...props} />

                }}/>  
         


    )
}

// const mapDispatchToProps = () => {
//     return {
//         actionsdetailRole: (rolename) => {dispatch(userActions.actionsdetailRole(rolename))}
//     }
// }

export default PrivateRouteListAppromonnaie;