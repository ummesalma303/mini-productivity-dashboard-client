
import { Link } from 'react-router'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  
  return (
    <>
    
     <h2 className='text-5xl font-bold bg-red-400 p-5'>Mini productivity tool</h2>
    <Button variant="destructive">Button</Button>
    <Link to='/home'> Home </Link>

    </>
  )
}

export default App
