import React, {useContext, useEffect, useState} from "react"
import { DataContext } from "../context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import Loading from "../components/Loading";

//cart
export default function Cart(){
    let {cart, totalPrice} = useContext(DataContext);
    let [isLoaded, setIsLoaded] = useState(false);
    let [map, setMap] = useState([]);
    useEffect(()=>{
        setMap([...cart.map(el=><SingleCart product={el}/>)])
    }, [cart])
    useEffect(()=>{
        setTimeout(() => {
            setIsLoaded(prev=>true)
        }, 2500);
    }, [])
    return(
        <>
            {isLoaded ?
                <div class="cart">
                    <div className="cart-container">
                        {cart.length>0
                        ? <>
                            {map.map(el=>el) /* map of the cocktails cart */}
                            <div className="cart-price-container">
                                <h3 className="cart-price-total-msg">Total Price</h3>
                                <h3 className="cart-price-total">${totalPrice}</h3>
                            </div>
                        </>
                        : 
                        <div className="cart-no-elements">
                            <img src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg"/>
                            <h1>No elements in the cart yet</h1>
                        </div>
                        }
                    </div>
                </div>
            : <Loading/>}
        </>
    )
}

//single cart
function SingleCart({product}){
    //use context variables
    let {cart, setCart, setTotalPrice} = useContext(DataContext);
    
    /* function add and delete */
    function handleDeleteClick(){
        let map = cart.map(el=>{
            if(el.idDrink === product.idDrink){
                setTotalPrice(prev=>prev-el.price)
                return (el.quantity>0) ? {...el, quantity: el.quantity-1} : el
            } return el;
        })
        map = map.filter(el=>el.quantity!==0);
        setCart([...map])
    }
    
    function handleAddClick(){
        let map = cart.map(el=>{
            if(el.idDrink === product.idDrink){
                setTotalPrice(prev=>prev+el.price)
                return {...el, quantity: el.quantity+1}
            } return el;
        })
        setCart([...map])
    }

    return(
        <div class="cart-el">
            <img src={product.strDrinkThumb}/>
            <h3>{product.strDrink}</h3>
            <div class="cart-el-icons-container">
                <button onClick={()=>handleDeleteClick()}><FontAwesomeIcon class="cart-el-icon" icon={faMinus} /></button>
                <label>{product.quantity}</label>
                <button onClick={()=>handleAddClick()}><FontAwesomeIcon class="cart-el-icon" icon={faPlus} /></button>
            </div>
            <h3>${product.price * product.quantity}</h3>
        </div>
    )
}