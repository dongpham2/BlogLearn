'use client' 
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import CreateModal from './create.modal';
import { useState } from 'react';
import UpdateModal from './update.modal';
import Link from 'next/link';
import { mutate } from 'swr';
interface IProps {
  blog: IBlog[]
}

function AppTable(props: IProps) {
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false)
  const {blogs} = props;
  
  const [blog, setBlog] = useState<IBlog | null>(null)
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)

  const handleDeleteBlog = (blogId:number) =>{
    if(confirm("Do yu want to delete this blog")) {
        fetch(`http://localhost:8000/blogs/${blogId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
              if(data) {
                toast.success("Delete blog successfully")
                mutate('http://localhost:8000/blogs')
              }
              else {
                toast.error("Fail to create blog")
              }
            })
    } 
      
  }
  return (
    <div className='mt-10'>
    <div className="flex justify-between mb-6">
      <h3>Table Blogs</h3>
      <Button variant='secondary' onClick={() => setShowModalCreate(true)} className='text-white bg-green-500'>Add New</Button>
    </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Author</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {blogs?.map(item => {
          return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.author}</td>
            <td>
              <Button className='bg-blue-700'>
                <Link href={`/blogs/${item.id}`}>
                View</Link>
              </Button>
              <Button variant='warning' className="mx-3 bg-yellow-500" onClick={() => {
                setBlog(item);
                setShowModalUpdate(true)
              }}>Edit</Button>
              <Button variant='danger' className='bg-red-500' onClick={() => handleDeleteBlog(item.id)}>Delete</Button>
              </td>
          </tr>
          )  
        })}
        
      </tbody>
    </Table>
    <CreateModal showModalCreate={showModalCreate} setShowModalCreate={setShowModalCreate} />
    <UpdateModal showModalUpdate={showModalUpdate} setShowModalUpdate={setShowModalUpdate} blog={blog} setBlog={setBlog} />
    </div>
  );
}

export default AppTable;