import React from 'react';
import './OptionsToggle.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function OptionsToggle(props) {

    return (
            <div className="options-card light-container">
                    <button
                        onClick={() => props.handleReport(props.itemId)}
                        className="option-button option signal light-button"
                    >
                        Signaler
                        <FontAwesomeIcon
                            icon={faExclamationCircle}
                        />
                    </button>
                    { props.updateItem && 
                    <>
                        <button
                            onClick={() => props.setModify(!props.modify)}
                            className="option-button light-button option edit"
                        >
                            Modifier
                            <FontAwesomeIcon
                                icon={faPen}
                            />
                        </button>
                        <button
                            onClick={() => props.handleDelete(
                                props.itemId
                                )}
                            className="option-button light-button option delete"
                        >
                            Supprimer
                            <FontAwesomeIcon
                                icon={faTrashAlt}
                            />
                        </button>
                    </>
                    }
                </div>
    )
}
