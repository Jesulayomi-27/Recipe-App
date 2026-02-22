import React, { useEffect, useState } from 'react';
import './MealDetailCard.css';

const MealDetailCard = ({ idMeal, onClose }) => {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        );
        const data = await response.json();
        setMeal(data.meals[0]);
      } catch (error) {
        console.error('Error fetching meal details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (idMeal) {
      fetchMealDetails();
    }
  }, [idMeal]);

  // 🔍 Extract ingredients + measures
  const getIngredients = () => {
    if (!meal) return [];

    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== '') {
        ingredients.push(`${measure} ${ingredient}`.trim());
      }
    }

    return ingredients;
  };

  if (loading) return <p>Loading meal...</p>;
  if (!meal) return <p>Meal not found.</p>;

  return (
    <div className="meal-detail-card">
      <button className="close-btn" onClick={onClose}>X</button>
      <h2>{meal.strMeal}</h2>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <p><strong>Category:</strong> {meal.strCategory}</p>
      <p><strong>Area:</strong> {meal.strArea}</p>

      <h3>Ingredients:</h3>
      <ul>
        {getIngredients().map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Instructions:</h3>
      <p>{meal.strInstructions}...</p>

      <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
        ▶ Watch on YouTube
      </a>
    </div>
  );
};

export default MealDetailCard;

