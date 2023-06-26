import React, {useState, useEffect, Suspense} from 'react'
import { Link,
  useSearchParams,
  useLoaderData, 
  defer,
  Await} from 'react-router-dom';
import { getVans } from '../../api';

export function loader(){
  return defer({ vans: getVans() })
}

const Vans = () => {
  const [searchParams, setSearchParams]= useSearchParams()
  // const [vans, setVans]= useState([]);
  // const [error, setError]= useState(null)
  const dataPromise= useLoaderData()

  let typefilter= searchParams.get("type")

  // useEffect(()=>{
  //   async function loadVans(){
  //     setLoading(true)
  //     try{
  //       const data= await getVans()
  //       setVans(data)
  //     }
  //     catch(err){
  //       setError(err)
  //     }
  //     finally{
  //       setLoading(false)
  //     }
  //   }
  //   loadVans()
  // }, [])

  function handleFilterChange(key, value) {
    setSearchParams(prevParams => {
        if (value === null) {
            prevParams.delete(key)
        } else {
            prevParams.set(key, value)
        }
        return prevParams
    })
}

  // if(error){
  //   return <h1>There was an error: {error.message}</h1>
  // }

  function renderVanElements(vans){
    const displayedVans= typefilter
    ? vans.filter(van =>(
      van.type=== typefilter
    )): vans

  const vanElements = displayedVans.map(van => (
    <Link to={van.id} 
    state={{ 
      search: `?${searchParams.toString()}`,
      type: typefilter }}>
    <div key={van.id} className="van-tile">
        <img src={van.imageUrl} />
        <div className="van-info">
            <h3>{van.name}</h3>
            <p>${van.price}<span>/day</span></p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
    </div>
    </Link>
))

  return(
    <>
    <div className="van-list-filter-buttons">
        <button 
          onClick={() => handleFilterChange("type", "simple")} 
          className={`van-type simple ${typefilter ==='simple'? 'selected': ''}`}
        >Simple</button>
        <button 
          onClick={() => handleFilterChange("type", "luxury")}
          className={`van-type luxury ${typefilter ==='luxury'? 'selected': ''}`}
        >Luxury</button>
        <button 
          onClick={() => handleFilterChange("type", "rugged")} 
          className={`van-type rugged ${typefilter ==='rugged'? 'selected': ''}`}>Rugged</button>
        {typefilter ?
        <button 
          onClick={() => handleFilterChange("type", null)}
          className='van-type clear-filters'
        >Clear-Filters</button>
        : null
        }
        
      </div>
      <div className="van-list">
        {vanElements}
      </div>
    </>
  )
}

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <Suspense fallback= {<h2>Loading Vans...</h2>}>
      <Await resolve={dataPromise.vans}>
        {renderVanElements}
      </Await>
      </Suspense>
    </div>
  )
}

export default Vans