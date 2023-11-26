import { useState, useEffect } from "react";
import FoodList from "../components/FoodList";
import FoodForm from "../components/FoodForm";
import { fetchData } from "../util/persistence";

function Api() {
  //da babel intepreter læser koden top til tå, er der lagt vægt på hvor koden står, så den altid er tilgængelig.
  // const blank er sat øverst, sammen med mine usestates for at sikre brughbarhed i functioner og components, både i samme environment og exported.
  const blank = {
    id: "",
    food: "",
    price: "",
  };
  //blank bliver lavet for at kunne lave en reset knap. Reset er til at kunne tilføje flere foods, da Id er readOnly som kan skabe problematikker
  const [foods, setFoods] = useState([]);
  const [foodEdit, setFoodEdit] = useState(blank);
  //API url refererer til den URL som vi kan tilgå vores API ved, ved brug af persistence.js filen.
  const APIURL = "http://localhost:3000/api";

  //vi tager prop food(fra forms) og opdatere foodEdit via setFoodEdit usestate, til at være vores parameter.
  function editFood(food) {
    setFoodEdit(food);
  }
  //en  if condition der simplificere valget mellem put/post idet vi bruger samme knap(add), med conditionen om id er tilstedet, igen med food prop.
  function updateCreate(food) {
    if (food.id != "") {
      //PUT
      updateFood(food);
    } else {
      //POST
      createFood(food);
    }
  }
  // en console.log for at sikre nem fejlfinding(da der var fejl). Fetchdata for at indskaffe data fra vores api (db.json).
  // food prop bliver igen brugt, til at setFoods, hvor vi tager fat i hele arrayen, og append vores prop, food. Der bliver så sat en html request og en body.

  function createFood(food) {
    console.log("create");
    fetchData(`${APIURL}`, (food) => setFoods([...foods, food]), "POST", food);
  }
  //food.id, fundet igennem at clicke edit og dermed specificere food props værdier, bruges til at præcisere hvilke food vi skal tage fat i.
  //if f.id===food.id then (hele food array) bliver crossrefrenced med Id(foreach), hvortil der bliver puttet f( ny food værdi) i arrayen.
  function updateFood(food) {
    console.log("update");
    fetchData(
      `${APIURL}/${food.id}`,
      (food) => {
        setFoods(foods.map((f) => (f.id === food.id ? { ...food } : f)));
      },
      "PUT",
      food
    );
  }
  //fetch, specific id, tom lambda expression.. det er et must grundet parametrene i fetchData, tror jeg. html request.
  function deleteFoodsId(foodId) {
    fetchData(`${APIURL}/${foodId}`, () => {}, "DELETE");

    setFoods([...foods.filter((f) => f.id != foodId)]);
  }
  // callback parametret håndtere fetched data, så vi siger fetchdata(fra)APIURL,Process fetched data.
  function getAllFoods(callback) {
    fetchData(APIURL, callback);
  }
  // -> callbacken referees her i form af "data", hvor vi bruger en UEF til at tage alt data, og sætte vores food array til at have alt den data, som dens data.
  useEffect(() => {
    getAllFoods((data) => setFoods(data));
  }, []);
  // return function, med components der videregiver functioner og variabler til de specificerede filer. De kan så importes og bruges.
  return (
    <>
      <FoodList
        foods={foods}
        deleteFoodsId={deleteFoodsId}
        editFood={editFood}
      />

      <FoodForm
        blank={blank}
        foodEdit={foodEdit}
        updateCreate={updateCreate}
        updateFood={updateFood}
      />
    </>
  );
}
export default Api;
