"use client"
import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import useSWR, { Fetcher } from 'swr'


const fetcher = (url: string) => fetch(url).then((res) => res.json());

function ViewDetailBlog({params}: {params: {id: string}}) {
    const fetcher: Fetcher<IBlog, string> = (url: string) => fetch(url).then((res) => res.json())
    
    const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
    );
    
    if(isLoading) {
      return <div>Loading...</div>
    }
return (
    <div>
        <Card style={{ width: '18rem' }}>
        <ListGroup variant="flush">
            <ListGroup.Item>{data?.id}</ListGroup.Item>
            <ListGroup.Item>{data?.title}</ListGroup.Item>
            <ListGroup.Item>{data?.author}</ListGroup.Item>
            <ListGroup.Item>{data?.content}</ListGroup.Item>
        </ListGroup>
        </Card>
    </div>
  )
}

export default ViewDetailBlog