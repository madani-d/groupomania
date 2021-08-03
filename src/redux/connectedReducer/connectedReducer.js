import axios from 'axios';
import io from 'socket.io-client';
const INITIALE_CONNECTED_STATE = {
    connected: false,
}
let socket;

function connectedReducer(state = INITIALE_CONNECTED_STATE, action) {
    
    switch(action.type) {
        case 'CONNECT': 
            socket = io(process.env.REACT_APP_API_URL, {path: '/groupomania_chat/'});
            socket.auth = localStorage.storageToken && {
                token: JSON.parse(localStorage.storageToken).token,
                userId: JSON.parse(localStorage.storageToken).userId
            }
            socket.connect();
            return {
                connected: true
            }
        case 'DISCONNECT':
            if (socket) {
                socket.emit('deconnexion', socket.auth.userId)
                socket.disconnect(socket.auth.userId);
                socket.close();
            }
            return {
                connected: false
            }

        default:
            return state
    }

}
export default connectedReducer;

export const connection = data => dispatch => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`,
            { email: data.email,password: data.password })

            .then(res => {
                const storageToken = {
                    "userId": res.data.userId,
                    "token": res.data.token,
                    "userRole": res.data.userRole
                }
                localStorage.setItem("storageToken", JSON.stringify(storageToken));
                dispatch({
                    type: 'CONNECT'
                })
            })
            .catch(err => {
                alert(err.response.data.message);
                // setErrorMessage();
            })
}

export const signup = data => dispatch => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signin`,
            { nom: data.nom, prenom: data.prenom, email: data.email, password: data.password })// Post with each form element value

            .then(res => {
                const storageToken = {
                    "userId": res.data.userId,
                    "token": res.data.token
                }
                localStorage.setItem("storageToken", JSON.stringify(storageToken));
                dispatch({
                    type: 'CONNECT'
                })
            })
            .catch(err => {
                alert(err.response.data.message)
            })
}

export const restoreConnection = () => dispatch => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/auth/restoreConnection`,
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
        } 
    )
    .then(result => {
        dispatch({
            type: 'CONNECT'
            })
    })
    .catch(result => {
        dispatch({
            type: 'DISCONNECT'
        })
    })
}