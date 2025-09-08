const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Example route
app.get("/api/products", (req, res) => {
  res.json([{ id: 1, name: "Cappuccino", quantity: 5 }]);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
