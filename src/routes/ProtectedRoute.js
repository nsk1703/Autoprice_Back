import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({component: Component, ...rest}) => {

    return (
        <Route
            {...rest}
                render = {(props) => {
                    const token = localStorage.getItem('token');
                    
                    if(!token) {
                        return <Redirect to='/login' />
                    }

                    return <Component {...props} />

                }
            }
        />  
         
    )
}

export default ProtectedRoute;