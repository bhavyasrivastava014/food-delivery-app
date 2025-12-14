const sampleFoodCategories = [
  {
    CategoryName: "Biryani/Rice"
  },
  {
    CategoryName: "Starter"
  },
  {
    CategoryName: "Pizza"
  },
  {
    CategoryName: "Pasta"
  },
  {
    CategoryName: "Chinese"
  },
  {
    CategoryName: "Desserts"
  },
  {
    CategoryName: "Beverages"
  },
  {
    CategoryName: "Burgers"
  },
  {
    CategoryName: "South Indian"
  },
  {
    CategoryName: "North Indian"
  }
];

const sampleFoodItems = [
  // Biryani/Rice
  {
    CategoryName: "Biryani/Rice",
    name: "Chicken Biryani",
    img: "https://images.unsplash.com/photo-1563379091339-03246963d7d9?w=300&h=200&fit=crop",
    options: {
      "Half": "120",
      "Full": "230"
    },
    description: "Aromatic basmati rice cooked with tender chicken and traditional spices"
  },
  {
    CategoryName: "Biryani/Rice",
    name: "Mutton Biryani",
    img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300&h=200&fit=crop",
    options: {
      "Half": "180",
      "Full": "350"
    },
    description: "Royal mutton biryani with fragrant rice and authentic spices"
  },
  {
    CategoryName: "Biryani/Rice",
    name: "Veg Biryani",
    img: "https://images.unsplash.com/photo-1505253213348-cd54c92b37be?w=300&h=200&fit=crop",
    options: {
      "Half": "80",
      "Full": "150"
    },
    description: "Mixed vegetables and basmati rice cooked with aromatic spices"
  },

  // Pizza
  {
    CategoryName: "Pizza",
    name: "Margherita Pizza",
    img: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=200&fit=crop",
    options: {
      "Medium": "200",
      "Large": "400"
    },
    description: "Classic pizza with fresh mozzarella, tomato sauce, and basil"
  },
  {
    CategoryName: "Pizza",
    name: "Pepperoni Pizza",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop",
    options: {
      "Medium": "250",
      "Large": "480"
    },
    description: "Delicious pizza topped with pepperoni and mozzarella cheese"
  },
  {
    CategoryName: "Pizza",
    name: "Veggie Supreme",
    img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300&h=200&fit=crop",
    options: {
      "Medium": "220",
      "Large": "420"
    },
    description: "Loaded with fresh vegetables, olives, and cheese"
  },

  // Burgers
  {
    CategoryName: "Burgers",
    name: "Classic Chicken Burger",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
    options: {
      "Single": "120",
      "Double": "200"
    },
    description: "Juicy chicken patty with lettuce, tomato, and special sauce"
  },
  {
    CategoryName: "Burgers",
    name: "Cheese Burger",
    img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop",
    options: {
      "Single": "100",
      "Double": "180"
    },
    description: "Beef patty with melted cheese, onions, and pickles"
  },
  {
    CategoryName: "Burgers",
    name: "Veg Burger",
    img: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300&h=200&fit=crop",
    options: {
      "Single": "80",
      "Double": "150"
    },
    description: "Crispy vegetable patty with fresh salad and mayo"
  },

  // Starter
  {
    CategoryName: "Starter",
    name: "Chicken Wings",
    img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=300&h=200&fit=crop",
    options: {
      "6 Pcs": "180",
      "12 Pcs": "320"
    },
    description: "Spicy buffalo chicken wings served with blue cheese dip"
  },
  {
    CategoryName: "Starter",
    name: "Paneer Tikka",
    img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop",
    options: {
      "Half": "150",
      "Full": "280"
    },
    description: "Grilled cottage cheese marinated in aromatic spices"
  },
  {
    CategoryName: "Starter",
    name: "Fish Fry",
    img: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300&h=200&fit=crop",
    options: {
      "4 Pcs": "200",
      "8 Pcs": "380"
    },
    description: "Crispy fried fish with traditional coastal spices"
  },

  // Chinese
  {
    CategoryName: "Chinese",
    name: "Chicken Fried Rice",
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop",
    options: {
      "Half": "120",
      "Full": "220"
    },
    description: "Wok-tossed rice with chicken, vegetables, and soy sauce"
  },
  {
    CategoryName: "Chinese",
    name: "Hakka Noodles",
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=200&fit=crop",
    options: {
      "Half": "100",
      "Full": "180"
    },
    description: "Stir-fried noodles with vegetables and Indo-Chinese flavors"
  },
  {
    CategoryName: "Chinese",
    name: "Manchurian",
    img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&h=200&fit=crop",
    options: {
      "Dry": "160",
      "Gravy": "180"
    },
    description: "Deep-fried vegetable balls in tangy Manchurian sauce"
  },

  // South Indian
  {
    CategoryName: "South Indian",
    name: "Masala Dosa",
    img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop",
    options: {
      "Plain": "60",
      "Masala": "80"
    },
    description: "Crispy rice crepe filled with spiced potato filling"
  },
  {
    CategoryName: "South Indian",
    name: "Idli Sambar",
    img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop",
    options: {
      "2 Pcs": "40",
      "4 Pcs": "70"
    },
    description: "Steamed rice cakes served with lentil curry and chutney"
  },
  {
    CategoryName: "South Indian",
    name: "Vada Sambar",
    img: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=300&h=200&fit=crop",
    options: {
      "2 Pcs": "50",
      "4 Pcs": "90"
    },
    description: "Crispy lentil donuts served with sambar and coconut chutney"
  },

  // North Indian
  {
    CategoryName: "North Indian",
    name: "Butter Chicken",
    img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop",
    options: {
      "Half": "180",
      "Full": "320"
    },
    description: "Creamy tomato-based chicken curry with aromatic spices"
  },
  {
    CategoryName: "North Indian",
    name: "Paneer Butter Masala",
    img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=200&fit=crop",
    options: {
      "Half": "150",
      "Full": "280"
    },
    description: "Rich cottage cheese curry in creamy tomato gravy"
  },
  {
    CategoryName: "North Indian",
    name: "Dal Tadka",
    img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop",
    options: {
      "Half": "80",
      "Full": "140"
    },
    description: "Yellow lentils tempered with cumin, garlic, and spices"
  },

  // Desserts
  {
    CategoryName: "Desserts",
    name: "Gulab Jamun",
    img: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop",
    options: {
      "2 Pcs": "60",
      "4 Pcs": "110"
    },
    description: "Soft milk dumplings soaked in rose-flavored sugar syrup"
  },
  {
    CategoryName: "Desserts",
    name: "Rasgulla",
    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=200&fit=crop",
    options: {
      "4 Pcs": "80",
      "8 Pcs": "150"
    },
    description: "Spongy cottage cheese balls in light sugar syrup"
  },
  {
    CategoryName: "Desserts",
    name: "Ice Cream",
    img: "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=300&h=200&fit=crop",
    options: {
      "Single Scoop": "50",
      "Double Scoop": "90"
    },
    description: "Creamy vanilla ice cream with various toppings"
  },

  // Beverages
  {
    CategoryName: "Beverages",
    name: "Mango Lassi",
    img: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=300&h=200&fit=crop",
    options: {
      "Regular": "60",
      "Large": "90"
    },
    description: "Creamy yogurt drink blended with sweet mango pulp"
  },
  {
    CategoryName: "Beverages",
    name: "Fresh Lime Water",
    img: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=200&fit=crop",
    options: {
      "Regular": "30",
      "Large": "50"
    },
    description: "Refreshing lime juice with mint and ice"
  },
  {
    CategoryName: "Beverages",
    name: "Masala Chai",
    img: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300&h=200&fit=crop",
    options: {
      "Regular": "20",
      "Large": "35"
    },
    description: "Traditional Indian spiced tea with milk"
  }
];

module.exports = { sampleFoodCategories, sampleFoodItems };
