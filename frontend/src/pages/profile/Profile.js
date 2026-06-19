import React, { useEffect, useState } from 'react'
import "./Profile.scss"
import PageMenu from '../../components/pageMenu/PageMenu'
import Card from '../../components/card/Card';
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';



const Profile = () => {
    const { isLoading, user } = useSelector(
      (state) => state.auth
    );

   
   
      const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        address: {}
      });
      const dispatch = useDispatch();
    
    useEffect(() => {
      if(user === null) {
        dispatch(getUser())
      }
    
    }, [dispatch, user])
    
    useEffect(() => {
      if(user) {
        setProfile({
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
            role: user?.role || "",
            address: user?.address || {}
        })
      }
    
    }, [user])
   
    const handleImageChange = () => {}
    // const handleInputChange = (e) => {
    //   const {name, value} = e.target;
    //   setProfile({...profile, [name]: value})
    // }

       const handleInputChange = (e) => {
          const { name, value } = e.target;

            if (name === "address" || name === "state" || name === "country") {
              setProfile({
                ...profile,
                address: {
                  ...profile.address,
                  [name]: value
                }
              });
            } else {
              setProfile({
                ...profile,
                [name]: value
              });
            }
        };
    
    
    
    
    const saveProfile = async(e) => {
       e.preventDefault() 

       const userData = {
         name: profile.name,
         phone: profile.phone,
         address: {
           address: profile.address.address,
           state: profile.address.state,
           country: profile.address.country,
         }
         
       }
      // console.log(userData)
      await dispatch(updateUser(userData))
    }
  
  return (
    <>
      <section>
        {
          isLoading && <Loader />
        }
        <div className='container'>
          <PageMenu />
          <h2>Profile</h2>
          <div className='--flex-start profile'>
              <Card cardClass={"card"}>
                 {
                  !isLoading && (
                     <>
                       <div className='profile-photo'>
                          <h2>Profile Image</h2>
                       </div>
                       <form onSubmit={saveProfile}>
                          <p>
                            <label>Change Photo:</label>
                            <input type="file" accept='image/*' name="image" onChange={handleImageChange} />
                          </p>
                          <p>
                            <label>Name:</label>
                            <input type="text" name='name' value={profile?.name} onChange={handleInputChange} required/>
                          </p>
                          <p>
                            <label>Email:</label>
                            <input type="email" name='email' value={profile?.email} onChange={handleInputChange} disabled />
                          </p>
                          <p>
                            <label>Phone:</label>
                            <input type="text" name='phone' value={profile?.phone} onChange={handleInputChange} required/>
                          </p>
                          <p>
                            <label>Address:</label>
                            <input type="text" name='address' value={profile?.address?.address || ""} onChange={handleInputChange} required/>
                          </p>
                          <p>
                            <label>State:</label>
                            <input type="text" name='state' value={profile?.address?.state || ""} onChange={handleInputChange} required/>
                          </p>
                          <p>
                            <label>Country:</label>
                            <input type="text" name='country' value={profile?.address?.country || ""} onChange={handleInputChange} required/>
                          </p>
                          <button className='--btn --btn-primary --btn-block'>
                             Update Profile
                          </button>
                       </form>
                     </>
                  )
                 }
              </Card>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile