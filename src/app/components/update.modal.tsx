import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from "swr"


interface IProps {
  showModalUpdate: boolean;
  setShowModalUpdate: (v: boolean) => void;
  blog: IBlog | null;
  setBlog: (v: IBlog | null) => void;
}

function UpdateModal(props: IProps) {
  const {showModalUpdate, setShowModalUpdate,blog, setBlog} = props;
  
  const [id, setId] = useState<number>(0)
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  
  useEffect(() => {
    if(blog && blog.id) {
      setId(blog.id);
      setTitle(blog.title);
      setAuthor(blog.author);
      setContent(blog.content);
    }
  }, [blog])

  const handleSubmit = () => {
    if(!title) {
      toast.error("Title is required!!")
      return;
    }
    if(!author) {
      toast.error("Author is required!!")
      return;
    }
    if(!content) {
      toast.error("Content is required!!")
      return;
    }
    fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ title, author, content }),
        })
            .then((response) => response.json())
            .then((data) => {
              if(data) {
                toast.warning("Update blog successfully")
                handleCloseModal()
                mutate('http://localhost:8000/blogs')
              }
              else {
                toast.error("Fail to create blog")
              }
            })
            .catch((error) => {
                console.error(error);
            });
    // toast.success("Create successfully")
    //   console.log("first", title, author, content)
  }

  const handleCloseModal = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setBlog(null)
    setShowModalUpdate(false)
  }
  return ( 
    <>
      <Modal show={showModalUpdate} 
        onHide={() => handleCloseModal()}
        size="lg"
        keyboard={false}
        backdrop = "static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New A Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="..." value={title} onChange={(e) => setTitle(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" placeholder="..." value={author} onChange={(e) => setAuthor(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='bg-black' onClick={() => handleCloseModal()}>
            Cancel
          </Button>
          <Button className='bg-blue-500' onClick={() => handleSubmit()} >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;