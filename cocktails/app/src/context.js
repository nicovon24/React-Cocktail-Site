import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const DataContext = React.createContext() //creating a context
//we will use it in all the app.js components

const DataProvider = ({ children }) => {
  let [products, setProducts] = useState([]); 
  let [filter, setFilter] = useState([]);
  let [cart, setCart] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(()=>{
    fetch(url)
      .then(resp=>resp.json())
      .then(data=>{
        let drinks = data.drinks.map(el=>{
          let rdmNum = Math.floor(Math.random() * (100 - 1) + 1)
          return {...el, price: rdmNum}
        });
        setProducts([...drinks])
        setFilter([...drinks])
      })
  }, [])

  return <DataContext.Provider value={{ //global elements in the app
    products,
    setProducts,
    filter, 
    setFilter, 
    cart, 
    setCart, 
    totalPrice, 
    setTotalPrice
  }}>{children}</DataContext.Provider>
}
// make sure use
//creating a function which will be used in the components in order to access the values
export const useGlobalContext = () => { 
  return useContext(DataContext)
}

export { DataContext, DataProvider }
