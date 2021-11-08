import React from 'react'
import { Link } from 'react-router-dom'

const style = {
    padding: '20px',
    fontSize: '30px',
    color: 'black'
}

const Nav = () => {
    return (
        <div>
            <Link style={style} to='register'>Register</Link>
            <Link style={style} to='login'>Login</Link>
        </div>
    )
}

export default Nav
