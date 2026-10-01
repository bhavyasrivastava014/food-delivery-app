import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'

export default function Home() {

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFoodCat, setFilteredFoodCat] = useState([]);
  const [filteredFoodItem, setFilteredFoodItem] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const loadData = async ()=> {
    let response = await fetch("https://food-delivery-app-c4kw.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      }
    });

    response = await response.json();

    setFoodItem(response[0])
    setFoodCat(response[1])
    setFilteredFoodItem(response[0])
    setFilteredFoodCat(response[1])
    // console.log(response[0], response[1])
  }

  const searchFood = async (term) => {
    try {
      const response = await fetch("http://food-delivery-app-c4kw.onrender.com/api/searchFood", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchTerm: term })
      });

      const result = await response.json();
      
      if (result.success) {
        setFilteredFoodItem(result.foodItems);
        setFilteredFoodCat(result.foodCategories);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const getSuggestions = async (term) => {
    if (term.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch("http://food-delivery-app-c4kw.onrender.com/api/searchSuggestions", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ searchTerm: term })
      });

      const result = await response.json();
      
      if (result.success) {
        setSuggestions(result.suggestions);
      }
    } catch (error) {
      console.error('Suggestions error:', error);
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      // Reset to show all items
      setFilteredFoodItem(foodItem);
      setFilteredFoodCat(foodCat);
      setSuggestions([]);
    } else {
      searchFood(term);
      getSuggestions(term);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    searchFood(suggestion);
  };

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel />
      </div>
      <div className="container">
        {/* Search Bar */}
        <div className="row justify-content-center my-4">
          <div className="col-md-6">
            <div className="position-relative">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search for restaurants, food items..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="position-absolute w-100 bg-white border rounded shadow-sm" style={{zIndex: 1000, top: '100%'}}>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2 cursor-pointer border-bottom"
                      style={{cursor: 'pointer'}}
                      onClick={() => handleSuggestionClick(suggestion)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <i className="bi bi-search me-2"></i>
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {searchTerm && (
              <div className="mt-2">
                <small className="text-muted">
                  Showing results for "{searchTerm}" ({filteredFoodItem.length} items found)
                </small>
                <button 
                  className="btn btn-link btn-sm ms-2 p-0"
                  onClick={() => {
                    setSearchTerm('');
                    setFilteredFoodItem(foodItem);
                    setFilteredFoodCat(foodCat);
                  }}
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
        {filteredFoodCat?.length > 0 ? (
          filteredFoodCat.map((data) => {
            const categoryItems = filteredFoodItem.filter((item) => item.CategoryName === data.CategoryName);
            
            if (categoryItems.length === 0) return null;
            
            return (
              <div key={data._id} className="fs-3 m-3">
                {data.CategoryName}
                <hr />
                <div className="row">
                  {categoryItems.map((filterItems) => (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3 mb-3">
                      <Card
                        foodItem={{
                          name: filterItems.name,
                          description: filterItems.description,
                          img: filterItems.img
                        }}
                        options={filterItems.options}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center my-5">
            <h3>No Results Found</h3>
            <p>Try searching for something else or browse all categories.</p>
            {searchTerm && (
              <button 
                className="btn btn-success"
                onClick={() => {
                  setSearchTerm('');
                  setFilteredFoodItem(foodItem);
                  setFilteredFoodCat(foodCat);
                }}
              >
                Show All Items
              </button>
            )}
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}
