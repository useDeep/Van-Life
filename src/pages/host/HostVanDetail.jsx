import React, {useState, useEffect} from 'react'
import { Link, useParams, Outlet, NavLink, useLoaderData } from 'react-router-dom'
import { getHostVans } from '../../api'
import { requireAuth } from '../../utils'

export async function loader({ params }) {
  await requireAuth()
  return getHostVans(params.id)
}

const HostVanDetail = () => {
  // const [currentVan, setCurrentVan]= useState()
  const currentVan= useLoaderData()

  const activeStyles= {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  }

  // useEffect(()=>{
  //   fetch(`/api/host/vans/${params.id}`)
  //     .then(res => res.json())
  //     .then(data => setCurrentVan(data.vans))
  // }, [])

return (
  <>
<section>
  <Link
    to=".."
    relative='path'
    className="back-button"
    >&larr; <span>Back to all vans</span></Link>

    <div className="host-van-detail-layout-container">
      <div className="host-van-detail">
        <img src={currentVan.imageUrl} />
        <div className="host-van-detail-info-text">
          <i className={`van-type van-type-${currentVan.type}`}>
            {currentVan.type}
          </i>
          <h3>{currentVan.name}</h3>
          <h4>${currentVan.price}/day</h4>
        </div>
      </div>
      <nav className="host-van-detail-nav">
        <NavLink to='.' end
        style={({isActive})=> isActive? activeStyles : null}>Details</NavLink>
        <NavLink to='pricing'
        style={({isActive})=> isActive? activeStyles : null}>Pricing</NavLink>
        <NavLink to='photos'
        style={({isActive})=> isActive? activeStyles : null}>Photos</NavLink>
      </nav>
      <Outlet context={{currentVan}}/>
    </div>
  </section>
  </>
  )
}

export default HostVanDetail