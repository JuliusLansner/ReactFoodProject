/* eslint-disable react/prop-types */
import { useState,useEffect } from "react";

function FoodForm({ blank, foodEdit, updateCreate}) {
  const [food, setFood] = useState({...foodEdit});

  useEffect(() => {
    setFood(foodEdit)
  }, [foodEdit]);
//det er er hvor vores food bliver sat, som vi kan bruge i resten af koden som prop.
  function handleChange(event){
    const value = event.target.value
    const foods = event.target.id
    setFood({ ...food, [foods]: value });
  }
  function handleSubmit(event){
    event.preventDefault();
    updateCreate(food);
    //callback function fra app.jsx som enten indsætter en ny person(hvis id tomt) eller opdatere(hvis id brugt)
  }
  return (
    <>
      <h1>Edit</h1>
      
      <form> 
        <label htmlFor="id">Id</label>
        <input
          id="id"
          type="number"
          readOnly
          placeholder="id"
          value={food.id}
        />
        <label htmlFor="food">Food</label>
        <input id="food" type="text" placeholder="food" value={food.food} onChange={handleChange}/>

        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          min="1"
          max="50000"
          placeholder="price"
          value={food.price}
          onChange={handleChange}
        />
        
        
        <button onClick={handleSubmit}>Add</button>
        <button onClick={() => setFood(blank)}>Reset</button>
      </form>
    </>
  );
}
export default FoodForm;
