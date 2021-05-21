import React,{ useEffect, useState } from 'react'
import './Nav.css'

const Nav = () => {
    const [show, handleShow] = useState(false)
    
    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            if(window.scrollY > 100){ //if scrolled down 100px
               handleShow(true)
            }else{
               handleShow(false)
            }
        })
        return ()=>{
            window.removeEventListener('scroll')
        }
    },[])

    return(
      <div className={`nav ${show && 'nav_black'}`}>
       <img class="nav_logo" src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="Netflix Logo" />
       <img src="https://www.pinclipart.com/picdir/big/0-2313_sunshine-sun-clip-art-with-transparent-background-free.png" alt="avatar" className="nav_avatar" />
      </div>
      
    )
}

export default Nav