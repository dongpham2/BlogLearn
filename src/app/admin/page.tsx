'use client'
import { useRouter } from 'next/navigation'
import x from './admin.module.scss'
import Button from 'react-bootstrap/Button';

function Admin() {
  const router = useRouter()
  
  const handleBack = () => {
    router.push("/")
  }

  return (
    <div>
      <div className="text-red-500">Admin</div>
      <Button variant='danger'>Next</Button>
      <button onClick={() => handleBack()}>Back</button>
    </div>
  )
}

export default Admin