import React, { useEffect, useState } from "react";
import { fetchData } from "../../utill/persistense";

function FoodForm({ foodList, updateFoodList, foodToEdit }) {
  const [id, setId] = useState("");
  const [food, setFood] = useState("");
  const [cost, setCost] = useState("");
  const APIURL = "http://localhost:3000/api";

  function clearForm() {
    setId("");
    setFood("");
    setCost("");
  }

  //Use effect to set the food that needs to be edited in the form
  useEffect(() => {
    if (foodToEdit) {
      setId(foodToEdit.id);
      setFood(foodToEdit.food);
      setCost(foodToEdit.cost);
    }
  }, [foodToEdit]);

  //Function to add food in the form to the list
  function addToFoodList() {
    const form = { id, food, cost };
    fetchData(
      APIURL,
      (data) => {
        console.log(data);
        updateFoodList()
      },
      "POST",
      form
    );

    clearForm();
  }
  //Function to update food
  function updateFood() {
    const form = { id, food, cost };

    if (id != null) {
      fetchData(
        `${APIURL}/${id}`,
        (data) => {
          console.log(data);
          updateFoodList()
        },
        "PUT",
        form
      );
    }

    clearForm()
  }

  //When you submit form
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Id</label>
        <input
          onChange={(e) => setId(e.target.value)}
          id="id"
          type="number"
          placeholder="id"
          readOnly
          value={id}
        />

        <label htmlFor="food">Food</label>
        <input
          onChange={(e) => setFood(e.target.value)}
          id="food"
          type="text"
          placeholder="name"
          value={food}
        />

        <label htmlFor="cost">Cost</label>
        <input
          onChange={(e) => setCost(e.target.value)}
          id="cost"
          type="number"
          placeholder="cost"
          value={cost}
        />
        <button onClick={addToFoodList}>Add</button>
        <button onClick={updateFood}>Update</button>
      </form>
    </div>
  );
}

export default FoodForm;
