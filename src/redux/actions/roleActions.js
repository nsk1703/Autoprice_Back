import { roleConstants } from "../../constants/roleConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const roles = () => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: roleConstants.ALL_ROLES_REQUEST
        });

        const token = localStorage.getItem('token');
        let config = {
            headers: {
              'USER-KEY': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
    
        axios.get('/roles', config)
        .then((response) => {
            // console.log(response.data)
            if(response.data.success === true){
                const {roles, success} = response.data

                dispatch({
                    type: roleConstants.ALL_ROLES_SUCCESS,
                    payload: { roles: roles, success: success }
                })
        //         toast.success('Ajouter avec succes!!')
            }else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    // const {success} = response.data
                    // toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: roleConstants.ALL_ROLES_FAIL,
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

export const newRole = (role) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: roleConstants.NEW_ROLES_REQUEST
        });
        console.log(role)
        let body = {
            name: role.name,
            description: role.description,
            dashboard: role.dashboard,
            log: role.log,
            statistique: role.statistique,
            commandes: role.commandes,
            paiements: role.paiements,
            remboursements: role.remboursements,
            listeProduit: role.listeProduit,
            ajouterProduit: role.ajouterProduit,
            modifierProduit: role.modifierProduit,
            supprimerProduit: role.supprimerProduit,
            listeCategorie: role.listeCategorie,
            ajouterCategorie: role.ajouterCategorie,
            modifierCategorie: role.modifierCategorie,
            supprimerCategorie: role.supprimerCategorie,
            listeApproMonnaie: role.listeApproMonnaie,
            ajouterApproMonnaie: role.ajouterApproMonnaie,
            modifierApproMonnaie: role.modifierApproMonnaie,
            supprimerApproMonnaie: role.supprimerApproMonnaie,
            listeApproProduit: role.listeApproProduit,
            ajouterApproProduit: role.ajouterApproProduit,
            modifierApproProduit: role.modifierApproProduit,
            supprimerApproProduit: role.supprimerApproProduit,
            listeMachine: role.listeMachine,
            ajouterMachine: role.ajouterMachine,
            modifierMachine: role.modifierMachine,
            listeMaintenance: role.listeMaintenance,
            ajouterMaintenance: role.ajouterMaintenance,
            modifierMaintenance: role.modifierMaintenance,
            supprimerMaintenance: role.supprimerMaintenance,
            supprimerMachine: role.supprimerMachine,
            listeSlide: role.listeSlide,
            ajouterSlide: role.ajouterSlide,
            modifierSlide: role.modifierSlide,
            supprimerSlide: role.supprimerSlide,
            listeRole: role.listeRole,
            ajouterRole: role.ajouterRole,
            modifierRole: role.modifierRole,
            supprimerRole: role.supprimerRole,
            listeUtilisateur: role.listeUtilisateur,
            ajouterUtilisateur: role.ajouterUtilisateur,
            modifierUtilisateur: role.modifierUtilisateur,
            supprimerUtilisateur: role.supprimerUtilisateur,

        }

        console.log(body)
        const token = localStorage.getItem('token');
        let config = {
            headers: {
              'USER-KEY': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }

        axios.post('/role', body, config)
        .then((response) => {
            // console.log(response)
            if(response.data.success === true){
                const {roles, success} = response.data
                // const rolesCount = response.data.success
                // console.log(roles)
                // console.log(success)
                dispatch({
                    type: roleConstants.NEW_ROLES_SUCCESS,
                    payload: { role: roles, success: success }
                })
                toast.success('Ajouter avec succes!!')
            }else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    // const {success} = response.data
                    // toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: roleConstants.NEW_ROLES_FAIL
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

export const editRole = (role) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: roleConstants.UPDATE_ROLES_REQUEST
        });

        const token = localStorage.getItem('token');
        let config = {
            headers: {
              'USER-KEY': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }

        console.log(role)
        let body = {
            name: role.name,
            description: role.description,
            dashboard: role.dashboard,
            log: role.log,
            statistique: role.statistique,
            commandes: role.commandes,
            paiements: role.paiements,
            remboursements: role.remboursements,
            listeProduit: role.listeProduit,
            ajouterProduit: role.ajouterProduit,
            modifierProduit: role.modifierProduit,
            supprimerProduit: role.supprimerProduit,
            listeCategorie: role.listeCategorie,
            ajouterCategorie: role.ajouterCategorie,
            modifierCategorie: role.modifierCategorie,
            supprimerCategorie: role.supprimerCategorie,
            listeApproMonnaie: role.listeApproMonnaie,
            ajouterApproMonnaie: role.ajouterApproMonnaie,
            modifierApproMonnaie: role.modifierApproMonnaie,
            supprimerApproMonnaie: role.supprimerApproMonnaie,
            listeApproProduit: role.listeApproProduit,
            ajouterApproProduit: role.ajouterApproProduit,
            modifierApproProduit: role.modifierApproProduit,
            supprimerApproProduit: role.supprimerApproProduit,
            listeMachine: role.listeMachine,
            ajouterMachine: role.ajouterMachine,
            modifierMachine: role.modifierMachine,
            listeMaintenance: role.listeMaintenance,
            ajouterMaintenance: role.ajouterMaintenance,
            modifierMaintenance: role.modifierMaintenance,
            supprimerMaintenance: role.supprimerMaintenance,
            supprimerMachine: role.supprimerMachine,
            listeSlide: role.listeSlide,
            ajouterSlide: role.ajouterSlide,
            modifierSlide: role.modifierSlide,
            supprimerSlide: role.supprimerSlide,
            listeRole: role.listeRole,
            ajouterRole: role.ajouterRole,
            modifierRole: role.modifierRole,
            supprimerRole: role.supprimerRole,
            listeUtilisateur: role.listeUtilisateur,
            ajouterUtilisateur: role.ajouterUtilisateur,
            modifierUtilisateur: role.modifierUtilisateur,
            supprimerUtilisateur: role.supprimerUtilisateur,

        }
        console.log(body)
    // //     // console.log( 'asss', token)
        axios.put(`/role/${role.id}`, body, config)
        .then((response) => {
            console.log(response)
            if(response.data.success === true){
                const {success} = response.data
        
                dispatch({
                    type: roleConstants.UPDATE_ROLES_SUCCESS,
                    payload: { isUpdated: success }
                })
                toast.success('Modifier avec succes!!')
            }
            else{
                if (response.data.success === false) {
                    dispatch({
                        type: roleConstants.UPDATE_ROLES_FAIL
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

export const detailRole = (roleId) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: roleConstants.ROLE_DETAILS_REQUEST
        });

        const token = localStorage.getItem('token');
        let config = {
            headers: {
              'USER-KEY': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
          

        console.log(roleId)
        axios.get(`/role/${roleId}`, config)
        .then((response) => {
            // console.log(response.data)
            if(response.data.success === true){
                const role = response.data
                    // console.log(role)
                dispatch({
                    type: roleConstants.ROLE_DETAILS_SUCCESS,
                    payload: {role: role}
                })
            }else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: roleConstants.ROLE_DETAILS_FAIL,
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

export const actionsdetailRole = (rolename) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: roleConstants.ROLE_DETAILS_REQUEST
        });

        let body = {
            name: rolename
        }

        const token = localStorage.getItem('token');
        let config = {
            headers: {
              'USER-KEY': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        //   rolename
        console.log('rolename',rolename)
        axios.get(`/role_name/${rolename}`, config)
        .then((response) => {
            console.log('response', response.data)
            if(response.data.success === true){
                const { role } = response.data
                    // console.log('response', role)
                dispatch({
                    type: roleConstants.ROLE_DETAILS_SUCCESS,
                    payload: {role: role}
                })
            }else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: roleConstants.ROLE_DETAILS_FAIL,
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

export const actionsprivateRole = (rolename) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: roleConstants.ROLE_PRIVATE_REQUEST
        });

        let body = {
            name: rolename
        }

        const token = localStorage.getItem('token');
        let config = {
            headers: {
              'USER-KEY': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        //   rolename
        console.log(rolename)
        axios.get(`/role_name/${rolename}`, config)
        .then((response) => {
            // console.log(response.data)
            if(response.data.success === true){
                const {role} = response.data
                    // console.log(role)
                dispatch({
                    type: roleConstants.ROLE_PRIVATE_SUCCESS,
                    payload: {role: role}
                })
            }else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: roleConstants.ROLE_PRIVATE_FAIL,
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