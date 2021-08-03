import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import './AvatarCropper.scss'
import { generateDownload } from './cropImage';
import { useDispatch } from 'react-redux';
import { updateAvatar } from '../../redux/usersReducer/usersReduser';

export default function AvatarCropper({avatar, userId, setUpdateAvatar}) {
    const [ crop, setCrop ] = useState({ x: 0, y: 0 });
    const [ zoom, setZoom ] = useState(1);
    const [ croppedArea, setCroppedArea ] = useState(null);
    const [ image, setImage ] = useState(null);
    const [ imageData, setImageData ] = useState(null);
    const dispatch = useDispatch();

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels)
    }, [])

    useEffect(() => {
        if (avatar && avatar.length > 0) {
            setImageData({ type: avatar[0].type, name: avatar[0].name })
            const reader = new FileReader();
            reader.readAsDataURL(avatar[0]);
            reader.addEventListener("load", () => {
                setImage(reader.result);
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = () => {
        generateDownload(image, croppedArea, imageData)
        .then(res => {
            const formData = new FormData();
            formData.append('file', res);
            formData.append('userId', userId)
            dispatch(updateAvatar(formData))
        })
    }

    return (
        <>
            <Cropper
                // className="avatar-cropper"
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                objectFit='contain'
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
            />
            <button  onClick={onSubmit} className="avatar-button avatar-button-send">Valider</button>
        </>
    )
}