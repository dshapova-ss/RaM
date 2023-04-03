"use client";
import { useRouter } from 'next/router';
import React from 'react';
import style from './user.module.css'

export default function Page() {
    const [data, setData] = React.useState<any>()
    const [isError, setIsError] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        if (router.isReady) { initQuery() }
    }, [router.isReady])
    function initQuery() {
        fetch(`https://rickandmortyapi.com/api/character/${router.query.id}`)
            .then((res) => res?.json())
            .then((data) => {
                setData(data)
            })
    }


    if (data && router.isReady) {
        return <div className={style.profile}>
            <p>{data.name}</p>
            <img src={data.image} width={200} height={200} />
            <ul>
                <li>
                    <p>Gender</p>
                    {data.gender}
                </li>
                <li>
                    <p>Species</p>
                    {data.species}
                </li>
                <li>
                    <p>Origin name</p>
                    {data.origin.name}
                </li>
                <li>
                    <p>Status</p>
                    {data.status}
                </li>
            </ul>
        </div>
    }
    return (<div className={style.profile}><img src="https://imgs.search.brave.com/lPacLt3uNigcPqscQP4Q2JOkyiQKAtDr7aVsL9pfCi8/rs:fit:1181:1181:1/g:ce/aHR0cHM6Ly93d3cu/c3VwZXJpb3JsYXdu/Y2FyZXVzYS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDUvbG9hZGluZy1n/aWYtcG5nLTUuZ2lm.gif" alt="" width={200} height={200} /></div>)
}