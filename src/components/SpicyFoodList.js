import React, { useState } from "react"
import { spicyFoods, getNewRandomSpicyFood } from "../data"

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods)
  const [filterBy, setFilterBy] = useState("All") // Add filterBy state

  // Add new food to the list
  function handleAddFood() {
    const newFood = getNewRandomSpicyFood()
    const newFoodArray = [...foods, newFood]
    setFoods(newFoodArray)
  }

  // Increment heat level of a food item
  function handleLiClick(id) {
    const newFoodArray = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        }
      } else {
        return food
      }
    })
    setFoods(newFoodArray)
  }

  // Update filterBy state
  function handleFilterChange(event) {
    setFilterBy(event.target.value)
  }

  // Filter foods based on cuisine
  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true
    } else {
      return food.cuisine === filterBy
    }
  })

  // Map over filtered foods to create a list
  const foodList = foodsToDisplay.map((food) => (
    <li key={food.id} onClick={() => handleLiClick(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  ))

  // Render the component
  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select name="filter" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </div>
  )
}

export default SpicyFoodList
