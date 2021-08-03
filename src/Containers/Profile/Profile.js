import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ArticleCard from '../../Components/ArticleCard/ArticleCard';
import {v4 as uuidv4} from 'uuid';
import Header from '../../Components/Header/Header';
import ProfilCard from '../../Components/ProfilCard/ProfilCard';
import { getUsers } from '../../redux/usersReducer/usersReduser';


export default function Profile() {
    const dispatch = useDispatch()
    const { articles } = useSelector(state => ({
        ...state.articleReducer
    }))
    const location = useLocation();
    const userProfile = location.pathname.slice(9).split("-");
    const userId = parseInt(userProfile[2]);


    const { users } = useSelector(state => ({
        ...state.usersReducer
    }))

    useEffect(() => {
        dispatch(getUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const user = users.find(element => element.id === userId)

    return (
        <>
            <Header/>
            <div className="">
                {/* <img src={} alt="" /> */}
            </div>
            <section className="thread">
                <ProfilCard user={user}/>
                {
                    articles.map(item => (
                        (userId === item.user_id) &&
                        <ArticleCard articleData={item} key={uuidv4()}/>
                    ))
                }
            </section>
        </>
    )
}
