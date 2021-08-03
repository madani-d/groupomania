import React from 'react';
import { Link } from 'react-router-dom';
import './ModalSearch.scss';

export default function ModalSearch({ searchTerm, setSearchTerm, searchResult, handleToggleSearch }) {
    return (
        <div className="overlay">
            <div>
                <div className="modal-header">
                    <input
                        type="text"
                        id="search-bar-modal"
                        className="modal-search"
                        placeholder="Rechercher"
                        autoFocus
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <button
                    className="button-close"
                    onClick={handleToggleSearch}>X</button>
                </div>
                <ul className="modal-search-liste">
                    {searchResult.map((item, index) => (
                        <li key={index}>
                            <Link to={{
                                pathname: `/profile/${item.prenom}-${item.nom}`,
                                state: {
                                        userId: item.id
                                    }
                            }}>
                                <img src={item.avatar} alt={`avatar de ${item.completName}`} className="modal-search-liste-avatar"/>
                                {item.prenom} {item.nom}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
