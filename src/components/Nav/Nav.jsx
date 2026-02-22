import React, { Children } from 'react'
import { NavLink } from 'react-router-dom';
import './Nav.css'
import Button from '../Button/Button';

const Nav = () => {
    const Data = [
        // {id:1, title: "Home", link: "/"},
        // {id:2, title: "About", link: "/about"},
        // {id:3, title: "Services", link: "/services"},
        // {id:4, title: "Contact", link: "/contact"},
    ];
  return (
    <header>
      <div>
        <h1>FOODIE</h1>
      </div>
      <nav id="nav">
        <ul id="nav-links">
            {Data.map((item) => {
                return (
                  <li key={item.id}>
                    <NavLink id="navLink" to={item.link}>{item.title}</NavLink>
                  </li>
                );
            })}
            
        <Button Children={"Login"}/>
        </ul>
      </nav>
    </header>
  )
}

export default Nav
