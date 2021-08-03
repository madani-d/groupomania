import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './CommentForm.scss';
import { postComment, updateComment } from '../../redux/articles/articleReducer';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function CommentForm({ articleId, texte, commentId }) {
    const { register, handleSubmit } = useForm();
    const [comm, setComm] = useState(texte ? texte : "");
    const dispatch = useDispatch();


    const onSubmit = (data) => {
        dispatch(postComment(articleId, data.comment));
    }

    const onUpdateSUbmit = data => {
        dispatch(updateComment(data.comment, commentId, articleId))
    }

    return (
        <>
            <form 
                onSubmit={texte ?
                    handleSubmit(onUpdateSUbmit)
                :
                    handleSubmit(onSubmit)
                }
                className="comment-form"
            >
                <input
                    {...register('comment', {required: true})}
                    value={comm}
                    onChange={(e) => setComm(e.target.value)}
                    type="text"
                    aria-label="ajouter un commentaire"
                    placeholder="Ajouter un commentaire"
                    className="comment-form-input" />
                <button
                    type="submit"
                    className="comment-form-button">
                    <FontAwesomeIcon 
                        icon={faPaperPlane}
                    />
                </button>
            </form>
        </>
    )
}
