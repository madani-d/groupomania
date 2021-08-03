import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Header from '../../Components/Header/Header';
import { loadReports } from '../../redux/reportReducer/reportReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { deleteArticleReported, deleteCommentReported } from '../../redux/reportReducer/reportReducer'
import './ReportPage.scss';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function ReportPage() {
    const { reported } = useSelector(state => state.reportReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadReports());
    }, [dispatch])

    const handleDeleteArticle = articleId => {
        dispatch(deleteArticleReported(articleId))
    }

    const handleDeleteComment = commentId => {
        dispatch(deleteCommentReported(commentId))
    }

    return (
        <>
            <Header/>
            <main  className="report-page">
                <h2>Articles Signalés</h2>
                <section>
                    {reported.articles.length ?
                        reported.articles.map(item => (
                            <article
                                key={uuidv4()}
                                className="light-container report-card">
                                <div className="card-header">
                                    <img
                                        className="avatar light-container"
                                        src={item.avatar}
                                        alt="avatar" />
                                    <p>{item.prenom} {item.nom}</p>
                                </div>
                                <figure>
                                    <figcaption>
                                        {item.texte_article}
                                    </figcaption>
                                    <img src={item.image_url} alt="" />
                                </figure>
                                <button
                                    onClick={() => handleDeleteArticle(item.id)}
                                >
                                    <FontAwesomeIcon 
                                        icon={faTrashAlt}
                                    />
                                </button>
                            </article>
                        ))
                    :
                        <h2>Aucuns Articles Signalés</h2>
                    }
                </section>
                <h2>Commentaires Signalés</h2>
                <section>
                    {reported.comments.length ?
                        reported.comments.map(item => (
                            <article
                                key={uuidv4()}
                                className="light-container report-card">
                                <div className="card-header">
                                    <img
                                        className="avatar light-container"
                                        src={item.avatar}
                                        alt="avatar" />
                                    <p>{item.prenom} {item.nom}</p>
                                </div>
                                <p>
                                    {item.texte_commentaire}
                                </p>
                                <button
                                    onClick={() => handleDeleteComment(item.id)}
                                >
                                    <FontAwesomeIcon 
                                        icon={faTrashAlt}
                                    />
                                </button>
                            </article>
                        ))
                    :
                        <h2>Aucuns Commentaires Signalés</h2>
                    }
                </section>
            </main>
        </>
    )
}
