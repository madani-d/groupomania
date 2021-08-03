import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './Header.scss';
import ModalSearch from '../ModalSearch/ModalSearch';
import Logo from '../../assets/icon-left-font-monochrome-black.svg';
import WhiteLogo from '../../assets/icon-left-font-monochrome-white.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faHome, faSearch, faSignOutAlt, faUser, faUserShield } from '@fortawesome/free-solid-svg-icons';


export default function Header() {
    const { users } = useSelector(state => ({
        ...state.usersReducer
    }))
    const usersNames = [...users];
    for (const userName of usersNames) {
        userName.completName = userName.prenom + " " + userName.nom
    }
    
    const { connected } = useSelector(state => ({
        ...state.connectedReducer
    }))

    const reportsCount = useSelector(state => (
        state.reportReducer.reported.count
    ))
    const dispatch = useDispatch();
    const history = useHistory();
    // If deconnected redirect to login page
    !connected && history.push('/');
    
    const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [modalSearch, setModalSearch] = useState(false);
    const [ myId, setMyId ] = useState();
    const me = parseInt(JSON.parse(localStorage.storageToken).userId)


    useEffect(() => {
        const MyId = users.filter(item => item.id === me);
        setMyId(...MyId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users])

    useEffect(() => {
        const changeWidth = () => {
            setWindowWidth(window.innerWidth);
        }
        
        window.addEventListener('resize', changeWidth);
        
        return () => {
            window.removeEventListener('resize', changeWidth);
        }
    }, [windowWidth])
    
    const handleToggleSearch = () => {
        setModalSearch(!modalSearch);
        setSearchTerm("");
    }
    
    
    useEffect(() => {
        window.scrollTo(0, 0);
        const result = usersNames.filter(user =>
            user.completName.includes(searchTerm)
            );
            searchTerm === "" ?
            setSearchResult([])
            :
            setSearchResult(result)
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm])
    
    const handleDeconnection = () => {
        localStorage.removeItem("storageToken");
        dispatch({
            type: 'DISCONNECT'
        })
        history.push('/');
    }



    return (
        <>
        {/* {    Desktop version     } */}
        { windowWidth > 1024 ?          
            <nav className="nav">
                <img src={Logo} alt="logo Groupomania" className="nav-logo"/>
                <ul className="liste">
                    {myId &&
                        <li className="items">
                            <Link to={{
                                pathname: `/profile/${myId.prenom}-${myId.nom}-${myId.id}`,
                                state: {
                                    userId: myId.id
                                }
                            }}>
                            <img
                                className="me-avatar"
                                src={myId.avatar}
                                alt={myId.nom}
                        />
                            </Link>
                        </li>
                    }
                    <li className="items">
                        <FontAwesomeIcon
                            icon={faHome}
                            onClick={() => history.push('/home')}
                        />
                    </li>
                    <li className="items">
                        <FontAwesomeIcon
                            icon={faComments}
                            onClick={() => history.push('/chat')}
                        />
                    </li>
                    {JSON.parse(localStorage.storageToken).userRole === 'Moderator' &&
                    <li className="items">
                        <FontAwesomeIcon
                            icon={faUserShield}
                            onClick={() => history.push('/ReportPage')}
                        />
                        <span>
                            {reportsCount}
                        </span>
                    </li>
                    }
                    <li className="items">
                        <FontAwesomeIcon
                            icon={faSignOutAlt}
                            onClick={handleDeconnection}
                        />
                    </li>
                </ul>
                <div className="search-container">
                    <input
                        type="text"
                        id="search-bar"
                        className="search"
                        placeholder="Rechercher"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        />
                    <ul className="search-liste">
                        {searchResult.map((item, index) => (
                            <li key={index}>
                                <Link to={{
                                    pathname: `/profile/${item.prenom}-${item.nom}`,
                                    state: {
                                        userId: item.id
                                    }
                                }}>
                                    <img src={item.avatar} alt={`avatar de ${item.completName}`} className="search-liste-avatar"/>
                                    {item.prenom} {item.nom}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        :
            <>
            {/* {     Mobile version    } */}
                <div className="nav-logo-small-container">
                    <img src={WhiteLogo} alt="logo Groupomania" className="nav-logo-small"/>
                </div>
                <nav className="nav-small">
                    <ul className="liste liste-small">
                        {myId &&
                        <li className="items">
                            <Link to={{
                                pathname: `/profile/${myId.prenom}-${myId.nom}-${myId.id}`,
                                state: {
                                    userId: myId.id
                                }
                            }}>
                            <img
                                className="me-avatar"
                                src={myId.avatar}
                                alt={myId.nom}
                        />
                            </Link>
                        </li>
                        }
                        <li className="items">
                            <FontAwesomeIcon
                                icon={faHome}
                            onClick={() => history.push('/home')}
                            />
                        </li>
                        <li className="items">
                        <FontAwesomeIcon
                            icon={faComments}
                            onClick={() => history.push('/chat')}
                        />
                        </li>
                        <li>
                            <FontAwesomeIcon
                                icon={faSearch}
                                onClick={handleToggleSearch} 
                                className="search-icon items"
                            />
                        </li>
                        {JSON.parse(localStorage.storageToken).userRole === 'Moderator' &&
                            <li className="items">
                                <FontAwesomeIcon
                                icon={faUserShield}
                                onClick={() => history.push('/ReportPage')}
                            />
                            </li>
                        }
                        <li className="items">
                            <FontAwesomeIcon
                                icon={faSignOutAlt}
                                onClick={handleDeconnection}
                            />
                        </li>
                    </ul>
                </nav>
                {modalSearch &&
                    <ModalSearch
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        searchResult={searchResult}
                        handleToggleSearch={handleToggleSearch}
                    />
                }
            </>
        }
        </>
    )
}
