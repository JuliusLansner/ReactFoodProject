function FoodList({ foods, deleteFoodsId, editFood }) {
  return (
    <div>
      <h1>A list of a few foods:</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Food</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((food) => (
            <tr key={crypto.randomUUID()}>
              <td>{food.id}</td>
              <td>{food.food}</td>
              <td>{food.price}</td>

              <td>
                <button onClick={() => editFood(food)}>Edit</button>
                <button onClick={() => deleteFoodsId(food.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodList;
