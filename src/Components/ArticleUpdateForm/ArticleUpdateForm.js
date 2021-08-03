import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { updateArticle } from '../../redux/articles/articleReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../ArticleForm/ArticleForm.scss'
import { faImages, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useForm } from 'react-hook-form';

function ArticleUpdateForm({imageUrl, texteArticle, articleId, index, setModify, modify}) {
    const { register, handleSubmit } = useForm();
    const [updatePreview, setUpdatePreview] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        setUpdatePreview(imageUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFile = e => {
        setUpdatePreview(URL.createObjectURL(e.target.files[0]))
    }

    const onSubmit = data => {
        if (data.file[0]) {
            const formData = new FormData();
            formData.append('article', data.article);
            formData.append('articleId', articleId);
            formData.append('file', data.file[0]);
            dispatch(updateArticle(formData, articleId, data.file[0].type))
        } else {
            const datas = {
                article: data.article,
                articleId
            }
            dispatch(updateArticle(datas, articleId))
        }
        setModify(!modify);
    }

    const handleResize = e => {
        e.target.style.height = e.target.scrollHeight + "px"
    }

    return (
        <form
            className="form-article"
            onSubmit={handleSubmit(onSubmit)}>
            <textarea
                autoFocus
                onInput={e => handleResize(e)}
                onFocus={e => handleResize(e)}
                aria-label="ajouter un article"
                placeholder="Quoi de neuf ?"
                className="form-article-input"
                name="article"
                defaultValue={texteArticle}
                {...register('article')}
                />
            <label 
                htmlFor="update-image"
                className="form-article-button form-article-file">
                <FontAwesomeIcon
                    icon={faImages}
                />
            </label>
            <input
                type="file"
                id="update-image"
                className="image"
                name="file"
                accept="image/*"
                {...register('file')}
                onChange={e => handleFile(e)}
                />
            <img src={updatePreview} alt="preview" className="preview" />
            <button 
                className="form-article-button form-article-send">
                    <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="article-form-send"
                    />
            </button>
        </form>
    )
}

export default ArticleUpdateForm;