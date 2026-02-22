import React, { useEffect, useState } from 'react'
import './HomeAbout.css'
import MealDetailCard from '../MealDietailCard/MealDetailCard'

const HomeAbout = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState([])
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]); // New state for search filtering
  const [loading, setLoading] = useState(true);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input


  //Fetch categories
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCategories(data.categories);
        setFoods(data.categories);
        setFilteredFoods(data.categories); // Initialize filtered foods
      } catch (error) {
        console.error("Error fetching food data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

   // Fetch meals by selected category
  const fetchMealsByCategory = async (category) => {
    if (category === "All") {
      setFoods(categories);
      setFilteredFoods(categories); // Reset filtered foods
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      setFoods(data.meals);
      setFilteredFoods(data.meals); // Set filtered foods
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter based on search term
    if (term === "") {
      // If search is empty, show all foods from current category
      setFilteredFoods(foods);
    } else {
      // Filter foods by name
      const filtered = foods.filter(food => {
        const foodName = food.strMeal || food.strCategory || "";
        return foodName.toLowerCase().includes(term);
      });
      setFilteredFoods(filtered);
    }
  };

  const handleTabClick = (category) => {
    setActiveCategory(category);
    setSearchTerm(""); // Clear search when changing categories
    fetchMealsByCategory(category);
  };

  const handleMoreClick = (id) => {
    setSelectedMealId(id); // ⬅️ Set the selected meal ID
  };

  const closeDetail = () => {
    setSelectedMealId(null); // ⬅️ Reset to close the detail view
  };

  if (loading) return <p>Loading...</p>;
  
  return (
    <div className='categories'>
      <div id='head'>
        <div id='AboutText'>
            <h1>Food For You</h1>
        </div>
        {/* Fixed search input with value and onChange */}
        <input 
          type="search" 
          placeholder='Search For Food' 
          value={searchTerm}
          onChange={handleSearch}
        />
        {/* Optional: Show search count */}
        {searchTerm && (
          <span className='search-count'>
            Found: {filteredFoods.length} items
          </span>
        )}
      </div>

      <div className='categoriesTab'>
        <div onClick={() => handleTabClick("All")} 
             className={`tabs ${activeCategory === "All" ? "activeTab" : ""}`} style={{borderBottom: activeCategory === "All"}}> All
        </div>
        {categories.map((cat) => (
          <div key={cat.idCategory}
               onClick={() => handleTabClick(cat.strCategory)}
               className={`tabs ${activeCategory === cat.strCategory ? "activeTab" : ""}`}
               style={{ borderBottom: activeCategory === cat.strCategory ? "2px solid black" : "none",}}> {cat.strCategory}
           </div>
        ))}
      </div>

      <div className='boxs'>
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => (
            <div className="box" key={food.idMeal || food.idCategory}>
              <img
                src={food.strMealThumb || food.strCategoryThumb}
                alt={food.strMeal || food.strCategory}
              />
              <h2>{food.strMeal || food.strCategory}</h2>
              {food.idMeal && (
                <button onClick={() => handleMoreClick(food.idMeal)}>More</button>
              )}
            </div>
          ))
        ) : (
          // Show "No results" message when search returns nothing
          <div className='no-results'>
            <p>No foods found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
      {/* Show the MealDetailCard if a meal is selected */}
      {selectedMealId && (
        <div className="meal-detail-wrapper">
          <MealDetailCard idMeal={selectedMealId} onClose={closeDetail} />
        </div>
      )}
    </div>
  )
}

export default HomeAbout
