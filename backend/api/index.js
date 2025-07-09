require("dotenv").config(); // Loads environment variables from .env file
const express = require("express");
const cors = require("cors");
const fs = require('fs');
const path = require("path");
const conncectDB = require("../config/db")
const authRoutes = require("../routes/authRoutes")
const incomeRoutes = require("../routes/incomeRoutes")
const expenseRoutes = require("../routes/expenseRoutes")
const dashboardRoutes = require("../routes/dashboardRoutes")
const loveRoutes = require("../routes/loveRoutes")

const app = express(); // Creates an Express app
app.use(express.json()); // Parses JSON from incoming requests
conncectDB(); // Connects to MongoDB database

// Ensure uploads folder exists (important for platforms like Render)
// const uploadsPath = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsPath)) {
//   fs.mkdirSync(uploadsPath);
// }

// Middleware to handle CORS
// Enables CORS so frontend and backend can communicate even if on different ports
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*", // Allows frontend to talk to backend
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use('/api/love', loveRoutes);

// Tells Express to serve static files (like images) from the uploads/ folder
// So now imageUrl will actually show the image in browser/postman
// app.use("/uploads", express.static(uploadsPath));


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Starts the server on the given port