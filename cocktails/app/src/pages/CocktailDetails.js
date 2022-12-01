import React, { useContext, useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import { DataProvider, DataContext } from '../context'
import { NavLink } from 'react-router-dom'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

//======================================================================================================
//cocktail details container
export default function CocktailDetails() {
  let [product, setProduct] = useState([]);
  let params = useParams();
  let id = params.idDrink;
  let {products} = useContext(DataContext);
  useEffect(()=>{
    if(products){
      if(products){
        let filter = products.filter(el=>el.idDrink===id);
        console.log(filter)
        if(filter.length>0){
          setProduct([...filter]);
        }
      }
    }
  }, [products])

  let map = product.map(el=><Cocktail product={el}/>)
  

  return (
    <div className="cocktail-section">
      <NavLink to="/">
        <button className="btn-details">Back Home</button>
      </NavLink>
      {map}
    </div>
  )
}


//======================================================================================================
//single cocktail
function Cocktail({product}){
  //getting all the ingredients
  let arrIngredientsNotNull = [];
  let ingredients = "";
  for(let el in product){
    if(el.includes("strIngredient")){
      if(product[el]!==null){
        arrIngredientsNotNull.push(el)
      }
    }
  }

  //getting the ingredients that are not null, we have a list of 15 possible ingredientes, some are null and others do not
  let i = 0;
  for(let el of arrIngredientsNotNull){
    if(i===arrIngredientsNotNull.length-1){
      ingredients+= product[el] + "." //want to end the list with a final point
    }
    else{
      ingredients+=product[el] + ", " //want to separate it by comas
    }
    i++;
  }
  //return
  return(
    <div className="details">
      <img src={product.strDrinkThumb}></img>
      <table className="details-table">
        <tbody className="details-tbody">
          <tr>
            <td className="details-data">Name:</td>
            <td>{product.strDrink}</td>
          </tr>
          <tr>
            <td className="details-data">Category:</td>
            <td>{product.strCategory}</td>
          </tr>
          <tr>
            <td className="details-data">Info:</td>
            <td>{product.strAlcoholic}</td>
          </tr>
          <tr>
            <td className="details-data">Glass:</td>
            <td>{product.strGlass}</td>
          </tr>
          <tr>
            <td className="details-data">Instructions:</td>
            <td>{product.strInstructions}</td>
          </tr>
          <tr>
            <td className="details-data">Ingredients:</td>
            <td>{ingredients}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}