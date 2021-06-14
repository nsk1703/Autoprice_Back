import { pieceConstants } from "../../constants/pieceConstants";
import axios from "axios";
import { toast } from 'react-toastify';

export const pieces = () => {

    return (dispatch) => {
        dispatch({
            type: pieceConstants.ALL_PIECE_REQUEST
        });

        axios.get('/pieces')
            .then((response) => {
                console.log(response);
                if (response.data.success === true) {
                    const { pieces } = response.data
                    const piecesCount = response.data.page_meta.total_items_count
                    // console.log(pieces)
                    dispatch({
                        type: pieceConstants.ALL_PIECE_SUCCESS,
                        payload: { pieces: pieces, piecesCount: piecesCount }
                    });
                } else {
                    if (response.data.success === false) {
                        // console.log(response.data.full_messages[0])
                        toast.error(response.data.full_messages[0]);

                        dispatch({
                            type: pieceConstants.ALL_PIECE_FAIL,
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

export const newPiece = (piece) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: pieceConstants.NEW_PIECE_REQUEST
        });
        let body = {
            etat: "1",
            status: "1",
            nom: piece.nom,
            type: piece.type['value'],
            localisation: piece.localisation,
            lien: piece.lien,
            montant: parseInt(piece.montant,10),
            description: piece.description,
            utilisateurid: localStorage.getItem('userid')
        }
        console.log(body)
        const token = localStorage.getItem('token');
        let config = {
            headers: {
            'Content-Type': 'application/json',
            'USER-KEY': `Bearer ${token}`
            }
        }
        axios.post('/piece', body, config)
        .then((response) => {
            console.log(response.data)
            if(response.data.success === true){
                const { success } = response.data
                
                dispatch({
                    type: pieceConstants.NEW_PIECE_SUCCESS,
                    payload: {success: success }
                })
                toast.success(response.data.full_messages[0])
            }
            else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    // const {success} = response.data
                    // toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: pieceConstants.NEW_PIECE_FAIL,
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

export const editPiece = (piece) => {
    // console.log()

    return (dispatch) => {
        dispatch({
            type: pieceConstants.UPDATE_PIECE_REQUEST
        });
        console.log('upmac',piece)
        let body = {
            etat: "1",
            status: "1",
            nom: piece.nom,
            type: piece.type['value'],
            localisation: piece.localisation,
            lien: piece.lien,
            montant: parseInt(piece.montant,10),
            description: piece.description,
            utilisateurid: localStorage.getItem('userid')
        }
        console.log(body)
        const token = localStorage.getItem('token');
        let config = {
            headers: {
            'Content-Type': 'application/json',
            'USER-KEY': `Bearer ${token}`
            }
        }
        console.log(token)
        axios.put(`/piece/${piece.id}`, body, config)
        .then((response) => {
            console.log(response)
            if(response.data.success === true){
                const { success } = response.data
                
                dispatch({
                    type: pieceConstants.UPDATE_PIECE_SUCCESS,
                    payload: {isUpdated: success }
                })
                toast.success(response.data.full_messages[0])
            }else{
                if (response.data.success === false) {
                    // console.log(response.data.full_messages[0])
                    // const {success} = response.data
                    // toast.error(response.data.full_messages[0]);
                    dispatch({
                        type: pieceConstants.UPDATE_PIECE_FAIL,
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

export const pieceDetail = (paramID) => {

    return (dispatch) => {
        dispatch({
            type: pieceConstants.PIECE_DETAILS_REQUEST
        });
        
        // console.log(paramID)
        axios.get(`/piece/${paramID}`)
            .then((response) => {
                // console.log(response);
                if (response.data.success === true) {
                    const piece  = response.data

                    console.log('piece details',piece)

                    dispatch({
                        type: pieceConstants.PIECE_DETAILS_SUCCESS,
                        payload: { piece: piece }
                    });
                }else {
                    if (response.data.success === false) {
                        // console.log(response.data.full_messages[0])
                        toast.error(response.data.full_messages[0]);

                        dispatch({
                            type: pieceConstants.PIECE_DETAILS_FAIL,
                            // payload: { error: success }
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