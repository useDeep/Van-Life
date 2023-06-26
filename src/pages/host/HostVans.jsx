import React, {useState ,useEffect, Suspense} from 'react'
import { Link, defer, useLoaderData, Await } from 'react-router-dom'
import { getHostVans } from '../../api'
import { requireAuth } from '../../utils'

export async function loader(){
  await requireAuth()
  return defer( {vans: getHostVans()} ) 
}

const HostVans = () => {
  // const [vans, setVans] = useState([])
  const dataPromise= useLoaderData()

  // useEffect(() => {
  //   fetch("/api/host/vans")
  //     .then(res => res.json())
  //     .then(data => setVans(data.vans))
  // }, [])
  function renderHostVans(vans){
    const hostVansEls = vans.map(van => (
      <Link
        to={van.id}
        key={van.id}
        className="host-van-link-wrapper"
      >
      <div className="host-van-single" key={van.id}>
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
          <div className="host-van-info">
              <h3>{van.name}</h3>
              <p>${van.price}/day</p>
          </div>
      </div>
        </Link>
    ))
    return(
      <div className="host-vans-list">
        {hostVansEls}
      </div>
    )
  }

  

  return(
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <Suspense resolve= {<h2>Loading Vans...</h2>}>
        <Await resolve= {dataPromise.vans}>
          {renderHostVans}
        </Await>
      </Suspense>
    </section>
    )
}

export default HostVans