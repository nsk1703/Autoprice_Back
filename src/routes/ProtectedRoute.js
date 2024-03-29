import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({component: Component, ...rest}) => {

    return (
        <Route
            {...rest}
                render = {(props) => {
                    const token = localStorage.getItem('token');
                    
                    if(token) {
                        return <Component {...props} /> 
                    }else{
                        return <Redirect to='/login' />
                    }

                }
            }
        />  
         
    )
}

export default ProtectedRoute;