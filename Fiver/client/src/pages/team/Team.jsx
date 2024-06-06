import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import "./Team.scss"
const team = () => {
  return (
    <>
      <div>
          <section className='back2'>
              <h2>Home / Team</h2>
              <h1>Team</h1>
          </section>
          <div className="marigin"></div>
        </div>
      
      

      <section className='team padding'>
        <div className='container grid'>
        <div className='items shadow'>
          <div className='img'>
            <img src="" alt='' />
          </div>
          <div className='details'>
            <h2>Name</h2>
            <p>Description</p>
          </div>
        </div>
        </div>
      </section>
    </>
  )
}

export default team
