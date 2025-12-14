# 🍕 GoFood - MERN Stack Food Delivery App

## 🚀 Quick Start Guide - Run in Browser

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation OR MongoDB Atlas account)
- Git

---

## 🏃‍♂️ **STEP-BY-STEP: Run Project Locally**

### 1. **Setup Backend Environment**
```bash
# Navigate to backend folder
cd my-app/backend

# Install backend dependencies
npm install

# Create environment file
cp .env.example .env
```

### 2. **Configure Database Connection**
Edit `my-app/backend/.env`:

**Option A: Local MongoDB**
```bash
mongoURI=mongodb://localhost:27017/gofoodmern
```

**Option B: MongoDB Atlas (Recommended)**
```bash
mongoURI=mongodb+srv://username:password@cluster.mongodb.net/gofoodmern?retryWrites=true&w=majority
```

### 3. **Setup Frontend**
```bash
# Navigate to frontend folder (open new terminal)
cd my-app

# Install frontend dependencies
npm install
```

### 4. **Start the Application**

**Terminal 1 - Backend Server:**
```bash
cd my-app/backend
npm start
```
✅ Backend will run on: http://localhost:5000

**Terminal 2 - Frontend Server:**
```bash
cd my-app
npm start
```
✅ Frontend will run on: http://localhost:3000

### 5. **Open in Browser**
```bash
# Automatically opens, or visit manually:
http://localhost:3000
```

---

## 🎯 **What You'll See**

### Homepage Features:
- **Food Categories**: Biryani, Pizza, Burgers, etc.
- **25+ Food Items**: Auto-populated with images and pricing
- **Search Bar**: Real-time search with suggestions
- **Add to Cart**: Functional shopping cart
- **Responsive Design**: Mobile-friendly interface

### Test These Features:
1. **Browse Menu**: Scroll through different food categories
2. **Search**: Try searching for "pizza", "biryani", or "burger"
3. **Add to Cart**: Click "Add to Cart" on any item
4. **View Cart**: Click cart icon in navigation (shows item count)
5. **Place Order**: Go through checkout process
6. **Order History**: View "My Orders" section

---

## 🔧 **Troubleshooting**

### Common Issues:

**"Cannot connect to MongoDB"**
```bash
# Make sure MongoDB is running locally, OR
# Use MongoDB Atlas connection string in .env
```

**"Port already in use"**
```bash
# Kill process on port 3000 or 5000:
npx kill-port 3000
npx kill-port 5000
```

**"Module not found"**
```bash
# Reinstall dependencies:
cd my-app && npm install
cd backend && npm install
```

### Database Auto-Population:
- The app automatically creates and populates the database
- No manual data entry required
- 25+ food items across 10 categories loaded automatically

---

## 📱 **Mobile Testing**
```bash
# Test responsive design:
# 1. Open browser developer tools (F12)
# 2. Toggle device toolbar
# 3. Select mobile device (iPhone, Android)
# 4. Test all functionality
```

---

## 🌟 **Key Features to Test**

### ✅ Shopping Cart System
- Add/remove items
- Quantity adjustment
- Persistent cart (refreshes page, items remain)

### ✅ Order Management  
- Place orders with customer details
- View order history
- Order status tracking

### ✅ Search & Filter
- Real-time search
- Search suggestions
- Filter by categories

### ✅ Responsive Design
- Mobile-first design
- Works on all screen sizes
- Touch-friendly interface

---

## 🚀 **Production Deployment**
Once tested locally, see `DEPLOYMENT.md` for production deployment instructions.

---

**Happy Coding! 🎉**
Your GoFood app is ready to run and impress!
