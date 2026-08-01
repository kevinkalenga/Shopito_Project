import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from "react-router-dom"

const AdminOnlyRoute = ({children}) => {
    const {user} = useSelector((state) => state.auth)
    const userRole = user?.role ?? {} 
    if(userRole === "admin") {
        return 
    }
  return (
    <section style={{height: "80vh"}}>
         <div className='container'>
           <h2>Permission denied</h2>
           <p>This page can only be viewed by an admin user.</p>
           <br />
           <Link to={"/"}>
              <button className='--btn'>
                  Back To Home
              </button>
           </Link>
         </div>
    </section>
  )
}

export default AdminOnlyRoute