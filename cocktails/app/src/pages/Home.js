import React, {useContext} from 'react'
import CocktailList from '../components/CocktailList'
import SearchForm from '../components/SearchForm'
import {useGlobalContext} from "../context";

const Home = () => {
  return (
    <div>
      <SearchForm/>
      <CocktailList/>
    </div>
  )
}

export default Home
