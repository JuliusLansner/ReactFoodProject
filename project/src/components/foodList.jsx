import React, { useEffect, useState } from 'react';
import { fetchData } from '../../utill/persistense';

function FoodList({foodList,updateFoodList,setFoodToEdit}) {
  const APIURL = 'http://localhost:3000/api';

  
  
  function handleEdit(id,food,cost){
   const edit = {id,food,cost}
   setFoodToEdit(edit)
  }

  function deleteFoodById(id) {
    // Assuming fetchData returns a Promise
    fetchData(`${APIURL}/${id}`, () => {
      console.log({ id });
      // The state update is moved here to ensure it happens after the fetch
      updateFoodList();
    }, 'DELETE');
  }

  return (
    <div>
      <h1>List of food</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Food</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodList.map((food) => (
            <tr key={crypto.randomUUID()}>
              <td>{food.id}</td>
              <td>{food.food}</td>
              <td>{food.cost}</td>
              <td>
                <button onClick={()=>handleEdit(food.id,food.food,food.cost)}>Edit</button>
                <button onClick={() => deleteFoodById(food.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodList;
