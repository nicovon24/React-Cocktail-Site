import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { DataContext } from '../context'

const CocktailList = () => {
  let [mapList, setMapList] = useState([]);
  let [isLoaded, setIsLoaded] = useState(false);
  let {filter, cart} = useContext(DataContext); //getting the products elements
  useEffect(()=>{
    setIsLoaded(false)
    setTimeout(()=>{ //we wait 2.5 seconds to show the info
      if(filter){
        setMapList([...filter.map(el=><Cocktail product={el}/>)])
        setIsLoaded(true);
      }
    }, 2500)
  }, [filter])
  return (
    <>
      {isLoaded 
      ? <>
        {
          mapList.length>0 
          ? <div className="drinks-section">
              <h1 className="drinks-title">Cocktails</h1>
              <div className="drinks-center">
                {mapList.length>0 && mapList} {/* showing the cocktails */}
              </div>
            </div>
          : <h1 className="drinks-noMatches">No Cocktails Matched Your Search Criteria</h1>
        }
      </> : <Loading/>
      }
    </>
  )
}

export default CocktailList
