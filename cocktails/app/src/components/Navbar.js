import React, {useContext, useState, useRef, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../logo.svg'
import { DataContext } from '../context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {
  let {totalPrice} = useContext(DataContext);
  let [hambActive, setHambActive]   = useState(true);
  let [closeActive, setCloseActive] = useState(false);
  let refNavBar  = useRef();
  return (
    <>
      <div className={`nav-links ${closeActive ? "nav-active" : "nav-inactive"}`} ref={refNavBar}>
        <li><NavLink to="/" exact activeClassName="active" end>Home</NavLink></li>
        <li><NavLink to="/about" exact activeClassName="active" end>About</NavLink></li>
        <li><NavLink to="/cart" exact activeClassName="active" end>Cart(${totalPrice})</NavLink></li>
      </div>
      <button className={`${closeActive ? "nav-active" : "nav-inactive"}`}
          onClick={()=>{
          setHambActive(prev=>true)
          setCloseActive(prev=>false)}}>
          <FontAwesomeIcon icon={faClose} className={`close-icon`} />
        </button>
        <button className={`${hambActive ? "nav-active" : "nav-inactive"}`}
          onClick={()=>{
          setHambActive(prev=>false)
          setCloseActive(prev=>true)
          console.log(refNavBar)
        }}><FontAwesomeIcon icon={faBars} className={`hamburger-icon`} /></button>
    </>
  )
}

export default Navbar
