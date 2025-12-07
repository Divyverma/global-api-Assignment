const express = require("express");
const postRoutes = require("./routes/postRoutes");
const { notFoundHandler, globalErrorHandler } = require("./utils/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
    endpoints: ["/api/posts", "/api/posts/:id"]
  });
});

app.use("/api/posts", postRoutes);
app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
