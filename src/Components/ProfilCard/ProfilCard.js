import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ProfilCard.scss';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import AvatarCropper from '../AvatarCropper/AvatarCropper';
import DeleteAccount from '../DeleteAccount/DeleteAccount';

export default function ProfilCard({ user }) {
    const [updatedAvatar, setUpdatedAvatar] = useState(user.avatar);
    const [avatarChanged, setAvatarChanged] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { register, handleSubmit } = useForm();
    const date = new Date(user.date_signin);
    const options = { year: "numeric", month: "long", day: "2-digit"};

    const handleFile = e => {
        setUpdatedAvatar(e.target.files);
        setAvatarChanged(true);
    }
    
    const onSubmit = data => {
        setAvatarChanged(false)
    }

    return (
        <section className="profil-header ">
            {JSON.parse(localStorage.storageToken).userId === user.id ?
                <>
                <form
                    className="update-avatar-form"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="profil-header-avatar light-container">
                        {avatarChanged ?
                            <AvatarCropper avatar={updatedAvatar} userId={user.id} setUpdatedAvatar={setUpdatedAvatar}/>
                        :
                            <img src={user.avatar} alt="avatar" className="profil-header-avatar-img"/>
                        }
                    </div>
                    {avatarChanged ?
                        <button
                            onClick={() => setAvatarChanged(false)}
                            className=" light-button avatar-button">
                            Annuler
                        </button>
                    :
                        <label htmlFor="avatar" className=" light-button avatar-button">
                            <FontAwesomeIcon
                                icon={faEdit}
                                />
                            Modifier
                        </label>
                    }
                    <input 
                        className="avatar image"
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/png, image/jpeg"
                        {...register('avatar')}
                        onChange={e => handleFile(e)}
                    />
                </form>
                </>
            :
                <div className="profil-header-avatar light-container">
                    <img src={user.avatar} alt="avatar" className="profil-header-avatar-img"/>
                </div>
            }
            <h1>{user.completName}</h1>
            <p>Inscrit depuis le {date.toLocaleDateString("fr-FR", options)}</p>
            {JSON.parse(localStorage.storageToken).userId === user.id &&
            <>
                <button onClick={() => setOpenModal(!openModal)}>Supprimer votre compte</button>
                {openModal && 
                    <DeleteAccount
                        setOpenModal={setOpenModal}
                    />
                }
                </>
            }
        </section>
    )
}
