"use client"

import {useQuery} from "@tanstack/react-query";
import Image from "next/image";

export default function Home() {
    const {isPending, error, data, isFetching} = useQuery({
        queryKey: ['repoData'],
        queryFn: () => fetchData(),
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div>
            <h1>Name: {data.name}</h1>
            {data.owner.avatar_url && <Image src={data.owner.avatar_url} alt={data.name} width={40} height={40}/>}
            <p>{data.description}</p>
            <strong>👀 {data.subscribers_count}</strong>{' '}
            <strong>✨ {data.stargazers_count}</strong>{' '}
            <strong>🍴 {data.forks_count}</strong>
        </div>
    );
}

const fetchData = async () => {
    const response = await fetch(
        'https://api.github.com/repos/TanStack/query',
    )
    return await response.json()
}
