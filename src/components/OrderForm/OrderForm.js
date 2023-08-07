import { useState } from "react";

function OrderForm({addNewOrder}) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  function postOrder(newOrder) {
    return fetch('http://localhost:3001/api/v1/orders', {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: { 'Content-Type': 'application/json'}
    }).then(res => res.json())
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(ingredients && name) {
    postOrder({
     
      name:name,
      ingredients:ingredients
    }).then(data => {
      console.log('order-added')
      addNewOrder(data)
    })
    clearInputs();
    } else {
      return <p>Please enter name and ingredients</p>
    }
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];

function handleIngredients(e) {
  e.preventDefault()
  {ingredients ? setIngredients([...ingredients, e.target.value]) : setIngredients([e.target.value])}
}


  const ingredientButtons = possibleIngredients.map((ingredient) => {
    
    return (

      <button
        key={ingredient}
        name={ingredient}
        value={ingredient}
        onClick={(e) => handleIngredients(e)}
      >
        {ingredient}
      </button>
    );
  });



  return (
    <form >
    
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

     {ingredients?
      <p>Order: {ingredients > 1? ingredients.join(", ") 
      : ingredients} </p> :
      <p>Order: "No ingredients"</p>}
      
      <button  onClick={e => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
