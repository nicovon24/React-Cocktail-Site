import React, {useContext, useEffect, useRef, useState} from 'react'
import { DataContext } from '../context'

const SearchForm = () => {
  let [option, setOption] = useState("");
  let [placeholder, setPlaceholder] = useState("");
  let [inputClassActive, setInputClassActive] = useState("inactive");
  let [inputDisabled, setInputDisabled] = useState(true);
  let {products, filter, setFilter} = useContext(DataContext);

  let refOption = useRef();
  useEffect(()=>{
    refOption.current.focus();
  }, [])

  function handleOnChangeSearch(e){
    let input = e.target.value.toUpperCase();
    if(products){
      //checking if the user selected an option in the select
      if(option!==""){
        if(input!==""){
          //ordering by name or glass depending on the select
          switch(option){
            case "drink-name" : setFilter([...products.filter(el=>el.strDrink.toUpperCase().includes(input))]); break;
            case "drink-glass": setFilter([...products.filter(el=>el.strGlass.toUpperCase().includes(input))]); break;
            case "drink-price": setFilter([...products.filter(el=>el.price<=parseFloat(input))]); break;
          }
          //otherwise we print all the elements
        } 
        else{
          setFilter([...products]);
        }
      } 
      else{
        setInputClassActive("inactive");
      }
    }
  }

  useEffect(()=>{
    setPlaceholder("Está mostrando todos los datos");
  }, [])

  useEffect(()=>{
    switch(option){
      //drink-name
      case "drink-name" : 
          setPlaceholder("Try with GG, A1...")
          setInputClassActive("");
          setInputDisabled(false);
          break;

      //drink-glass
      case "drink-glass": 
          setPlaceholder("Try with collins glass...");
          setInputClassActive("");
          setInputDisabled(false);
          break;

      //drink-price
      case "drink-price": 
          setPlaceholder("Try with 50...");
          setInputClassActive("");
          setInputDisabled(false);
      break;

      //default
      default: 
          setPlaceholder("Choose one option, please...")
          setInputClassActive("inactive");
          setInputDisabled(true); 
          break;
    }
  }, [option])
  
  return (
    <div className="search">
      <form className="search-form">
        <div className="form-control">
          <label>Search your Favorite Cocktail!</label>
          <div className="form-content">
            <select className="form-select form-el" onChange={e=>setOption(e.target.value)} ref={refOption}>
              <option>Search by...</option>
              <option value="drink-name">Drink's name</option>
              <option value="drink-glass">Glass' type</option>
              <option value="drink-price">Maximum price</option>
            </select>
            <input className={`form-el ${inputClassActive}`} type="text" placeholder={placeholder} disabled={inputDisabled}
            onChange={e=>handleOnChangeSearch(e)}></input>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchForm
