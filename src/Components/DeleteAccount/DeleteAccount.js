import React from 'react';
import { useHistory } from 'react-router';
import './DeleteAccount.scss';
import axios from 'axios'
import { useDispatch } from 'react-redux';

export default function DeleteAccount({ setOpenModal }) {
    const history = useHistory();

    const dispatch = useDispatch()
    const handleDeleteAccount = () => {
        dispatch({
            type: 'DISCONNECT'
        })
        axios(`${process.env.REACT_APP_API_URL}/api/auth/deleteAccount`,
        {
            params: { ID: parseInt(JSON.parse(localStorage.storageToken).userId) },
            headers : { "authorization": "Bearer " + JSON.parse(localStorage.storageToken).token }
        }
    )
    .then(res => {
        history.push('/signin')
    })
    }
    return (
        <div className="modal">
            <div className="modal-content light-container">
                <h1>Voulez vous vraiment supprimer votre compte ?</h1>
                <div className="modal-button-box">
                    <button
                        onClick={() => handleDeleteAccount()}
                        id="delete-account"
                        className="modal-button light-button"
                    >
                        Oui
                    </button>
                    <button
                        onClick={() => setOpenModal(false)}
                        className="modal-button light-button"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    )
}
