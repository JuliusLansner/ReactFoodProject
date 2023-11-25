
import { useState, useEffect } from "react";
import FoodList from '../components/FoodList'
import FoodForm from '../components/FoodForm'
import { fetchData } from "../util/persistence";



function Api() {
        const blank = {
          id: "",
          food: "",
          price: "",
          
        };
  const [foods, setFoods] = useState([]);
  const [foodEdit, setFoodEdit] = useState(blank);
  const APIURL = "http://localhost:3000/api";

        //edit food using usestate created above.
        //we make a blank foodedit, for the sake of having a possible reset button.
  function editFood(food) {
    setFoodEdit(food);
  }
  function updateCreate(food) {
    if (food.id != "") {
      //PUT
      updateFood(food);
    } else {
      //POST
      createFood(food);
    }
  }

  function createFood(food) {
    console.log("create");
    fetchData(`${APIURL}`, 
    (food) => setFoods([...foods, food]),
     "POST",
      food
      );
  }

  function updateFood(food) {
    console.log("update");
    fetchData(
      `${APIURL}/${food.id}`,
      (food) => {
        setFoods(
          foods.map((f) => (f.id === food.id ? { ...food } : f))
        );
      },
      "PUT",
      food
    );
  }
  
  function deleteFoodsId(foodId) {
    

    fetchData(`${APIURL}/${foodId}`, () => {}, "DELETE");
    
    setFoods([...foods.filter((f) => f.id != foodId)]);
  }
  function getAllFoods(callback) {
   
    fetchData(APIURL, callback);
  }
  useEffect(() => {
    getAllFoods((data) => setFoods(data));
  }, []);

  return (
    <>
      <FoodList
      foods = {foods}
      deleteFoodsId={deleteFoodsId}
      editFood={editFood}
      />

      <FoodForm
      blank = {blank}
      foodEdit={foodEdit}
      updateCreate={updateCreate}
      updateFood={updateFood}
      />
    </>
  );
}
export default Api;
