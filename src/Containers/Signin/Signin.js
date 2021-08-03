import { faAt, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import logo from '../../assets/without-icon.svg';
import icon from '../../assets/icon.svg';

function Signin({  setUserId, setToken, setIsLogin }) {
    const { register, handleSubmit } = useForm();
    const [errorMessage, setErrorMessage] = useState([])
    const dispatch = useDispatch()
    const [passwordValid, setPasswordValid] = useState(true)

    const history = useHistory();

    const handleBlur = e => {
        if(e.value === "") {
            e.placeholder = "Champ obligatoire";
            e.required = true;
        }
    }

    const handleChange = e => {
        if(e.value.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,15})$/) === null) {
            e.required = true;
            setPasswordValid(false);
            e.classList.add(':invalid')
        } else {
            setPasswordValid(true);
        }
    }

    const onSubmit = data => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signin`,
        { nom: data.nom, prenom: data.prenom, email: data.email, password: data.password })// Post with each form element value
        
        .then(res => {
            const storageToken = {
                    "userId": res.data.userId,
                    "token": res.data.token
                }
                localStorage.setItem("storageToken", JSON.stringify(storageToken));
                dispatch({ type: 'CONNECT' })
                history.push('/home');
            })
            .catch(err => {
                const error = err.response.data.errors.map(item => item.msg)
                setErrorMessage(error)
            })
    };


    return (
        <div className="connection-container light-container">
                <div className="icon-container">
                    <img src={icon} alt="logo groupomania" className="icon light-icon" />
                </div>
                <img src={logo} alt="logo groupomania"/>
                <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-container light-input">
                        <span className="input-icon light-input-icon">
                            <FontAwesomeIcon icon={faUser}/>
                        </span>
                        <input
                            type="text"
                            id="prenom"
                            aria-label="prenom"
                            placeholder="Prenom"
                            {...register('prenom', {required: true})}
                            onBlur={(e) => handleBlur(e.target)}
                            />
                    </div>

                    <div className="input-container light-input">
                        <span className="input-icon light-input-icon">
                            <FontAwesomeIcon icon={faUser}/>
                        </span>
                        <input
                            type="text"
                            id="nom"
                            aria-label="nom"
                            placeholder="Nom"
                            {...register('nom', {required: true})}
                            onBlur={(e) => handleBlur(e.target)}
                            />
                    </div>

                    <div className="input-container light-input">
                    <span className="input-icon light-input-icon">
                        <FontAwesomeIcon icon={faAt}/>
                    </span>
                    <input
                        type="text"
                        id="email"
                        aria-label="email"
                        placeholder="Email"
                        {...register('email', {required: true})}
                        onBlur={(e) => handleBlur(e.target)}
                        />
                    </div>

                <div className="input-container light-input">
                    <span className="input-icon light-input-icon">
                        <FontAwesomeIcon icon={faLock}/>
                    </span>
                    <input
                        type="password"
                        id="password"
                        aria-label="mot de passe"
                        placeholder="Mot de passe*"
                        {...register('password', {required: true})}
                        onBlur={(e) => handleBlur(e.target)}
                        onInput={(e) => handleChange(e.target)}
                        />
                    <p 
                        className={
                            passwordValid ?
                                "info-password"
                            :
                                "info-password-invalid"
                            }
                    >
                        *Entre 8 et 15 caractères dont 1 minuscule, 1 majuscule, 1 chiffre</p>
                </div>

                    <button
                        className="light-button">
                        S'inscrire
                    </button>
                    <span className="error-message">
                    {
                        errorMessage && 
                        errorMessage.map((item, index) => <p key={index}>{item}</p>)
                    }
                    </span>
                </form>
                <p>Ou</p>
                <button
                    className="light-button"
                    onClick={() => history.push('/login')}>
                    Se connecter
                </button>
            </div>
    )
}

export default Signin;