import axios from 'axios';
const INITIAL_SOCKET_STATE = {
    messages: []
}

function socketReducer(state = INITIAL_SOCKET_STATE, action) {
    switch(action.type) {
        case 'LOADCHAT':
            return {
                messages: action.payload
            }

        case 'SENDCHAT':
            const newList = [...state.messages, action.payload];
            return {
                messages: newList
            }

        default:
            return {
                messages: state.messages
            }
    }
}

export default socketReducer;

export const loadChat = () => dispatch => {
    axios(`${process.env.REACT_APP_API_URL}/api/chat/loadMessages`,
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
        }
    )
    .then(res => {
        dispatch({
            type: 'LOADCHAT',
            payload: res.data
        })
    })
}

export const sendChat = message => dispatch => {

    dispatch({
        type: 'SENDCHAT',
        payload: message
    })
}