import { useState, useEffect } from 'react'
import React from 'react'
import FoodList from './components/foodList'
import FoodForm from './components/foodForm'
import { fetchData } from '../utill/persistense'
import './App.css'

function App() {
  const [foodList, setFoodList] = useState([]);
  const APIURL = 'http://localhost:3000/api';
  //To hold food that needs to be edited
  const [foodToEdit,setFoodToEdit] = useState(null)

  //Sets the food list on render
  useEffect(() => {
    fetchData(APIURL, (data) => {
      console.log(data)
      setFoodList(data);
    });
  },[]);
  
  //update foodList
  function updateFoodList() {
    fetchData(APIURL, (data) => {
      console.log(data);
      // Assuming data is an object with a property named 'foodList'
      setFoodList(() => data);
    });
  }

  return (
    <>
  <div>
    <FoodList foodList={foodList} updateFoodList={updateFoodList} setFoodToEdit = {setFoodToEdit}/>
    <FoodForm foodList={foodList} updateFoodList={updateFoodList}  foodToEdit={foodToEdit}/>
  </div>
    </>
  )
}

export default App
