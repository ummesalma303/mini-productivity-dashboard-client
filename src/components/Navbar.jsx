import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <div>
      <Link to='/home'>Home</Link>
      <Link to='/home'>Sign Up</Link>
      <Link to='/home'>Sign In</Link>
    </div>
  )
}

export default Navbar
