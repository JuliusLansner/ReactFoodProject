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
  

  return (
    <>
  <div>
    <FoodList foodList={foodList} setFoodList={setFoodList} setFoodToEdit = {setFoodToEdit}/>
    <FoodForm foodList={foodList} setFoodList={setFoodList} foodToEdit={foodToEdit}/>
  </div>
    </>
  )
}

export default App
