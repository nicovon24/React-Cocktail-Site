import React, {useContext, useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import { DataContext } from '../context';

const Cocktail = ({product}) => {
  let {cart, setCart, setTotalPrice} = useContext(DataContext);
  let [counter, setCounter] = useState(0);
  let [flagAdd, setFlagAdd] = useState(false);
  let [flagDelete, setFlagDelete] = useState(false);

  //*effects of functions (allows us to update them correctly) 
  //add
  useEffect(()=>{
    let some = cart.some(el=>el.idDrink===product.idDrink)

    if(some===false){
      setCart([...cart, {...product, quantity: 1}])
    } 
    else{
      setCart([...cart.map(el=>{
        if(el.idDrink===product.idDrink) {
          let newQuantity = el.quantity+1;
          return {...el,quantity:newQuantity}
        } 
        return el
      })]) 
    }
  }, [flagAdd])

  //delete
  useEffect(()=>{
    setCart([...cart.filter(el=>el.idDrink!==product.idDrink)])
  },[flagDelete])


  useEffect(()=>{
    //*giving the counter state, the quantity of the product chosen by the user
    let filter = cart.filter(el=>el.idDrink===product.idDrink)
    //if there is nothing in the filter, the element is not in the cart
    if(filter.length===0){
      setCounter(0) //so we define it as cero
    }
    else {
      setCounter(()=>filter[0].quantity) //otherwise, it is the quantity of the product
    }

    //*setting the total price
    let total = 0
    let map = cart.map(el=>{
      total+=el.price*el.quantity
    })
    setTotalPrice(total)
    
  }, [cart])

  return (
    <div className="drink">
        <div class="drink-img-container">
          <img src={product.strDrinkThumb}></img>
          {counter>0 && 
          <>
            <label class="drink-counter">{counter}</label>
            <button className="drink-remove-btn" onClick={()=>setFlagDelete(prev=>!prev)}>X</button>
          </>
          }
        </div>
        <div className="drink-footer">
            <h1>{product.strDrink}</h1>
            <h4>{product.strGlass}</h4>
            <p>{product.strAlcoholic}</p>
            <NavLink to={`cocktail/${product.idDrink}`}>
              <button className="btn-primary drink-btn-details">Details</button>
            </NavLink>
            <button className="drink-add-btn btn-primary" onClick={()=>setFlagAdd(prev=>!prev)}>${product.price}</button>
        </div>
    </div>
  )
}

export default Cocktail
