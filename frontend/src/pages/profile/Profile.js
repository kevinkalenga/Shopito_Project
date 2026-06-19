import React from 'react'
import "./Profile.scss"
import PageMenu from '../../components/pageMenu/PageMenu'

const Profile = () => {
  return (
    <>
      <section>
        <div className='container'>
          <PageMenu />
          <h2>Profile</h2>
        </div>
      </section>
    </>
  )
}

export default Profile