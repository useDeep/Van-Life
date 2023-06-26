import React, {useState ,useEffect} from 'react'
import {useParams, Link, useLocation, useLoaderData} from 'react-router-dom'
import { getVans } from '../../api'

export function loader({params}){
    return getVans(params.id)
}
const VanDetail = () => {
    // const [van, setVan]= useState(null)
    const params= useParams()
    const location= useLocation()
    const van= useLoaderData()

    // useEffect(()=>{
    //     fetch(`/api/vans/${params.id}`)
    //         .then(res => res.json())
    //             .then(data => setVan(data.vans))
    // }, [params.id])

    const search= location.state?.search || ""
    const type = location.state?.type || "all"

  return (
    <div className="van-detail-container">
        <Link
            to={`..${search}`}
            relative="path"
            className="back-button"
        >&larr; <span>Back to {type} vans</span>
        </Link>

        {van ? (
            <div className="van-detail">
                <img src={van.imageUrl} />
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
            </div>
        ) : <h2>Loading...</h2>}
        </div>
  )
}

export default VanDetail