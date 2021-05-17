import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';  
import * as userActions  from "../redux/actions/userActions";

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
                }}
        />  

    )
}

// const mapDispatchToProps = () => {
    
// }
// connect(null, mapDispatchToProps)
export default ProtectedRoute;