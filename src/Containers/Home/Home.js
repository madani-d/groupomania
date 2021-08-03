import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../../redux/articles/articleReducer';
import { getUsers } from '../../redux/usersReducer/usersReduser';
import ArticleForm from '../../Components/ArticleForm/ArticleForm';
import ArticleCard from '../../Components/ArticleCard/ArticleCard';
import Header from '../../Components/Header/Header';
import {v4 as uuidv4} from 'uuid';
import { loadReports } from '../../redux/reportReducer/reportReducer';
import './Home.scss';


export default function Home() {

    const { articles } = useSelector(state => ({
        ...state.articleReducer
    }))
    const dispatch = useDispatch();

    useEffect(() => {
        // Get Articles and users
        dispatch(getArticles());
        dispatch(getUsers());
        // Check if user is moderator
        // If moderator load reported posts
        if (JSON.parse(localStorage.storageToken).userRole === 'Moderator') {
            dispatch(loadReports());
        }
    }, [dispatch]);

    return (
        <>
            <Header/>
            <section className="thread">
            <ArticleForm/>
                {articles.map((item, index) => (
                    <ArticleCard articleData={item} index={index} key={uuidv4()}/>
                ))}
            </section>
        </>

    )
}
