const express = require("express");
const { getFilteredPosts, getPostDetails } = require("../services/postService");

const router = express.Router();


router.get("/", async (req, res, next) => {
  try {
    const { userId, title, limit, refresh } = req.query;

    const posts = await getFilteredPosts({
      userId,
      title,
      limit,
      forceRefresh: refresh === "true"
    });

    res.json({
      count: posts.length,
      filters: { userId, title, limit, refresh },
      data: posts
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await getPostDetails(id);

    if (!post) {
      const err = new Error(`Post with id=${id} not found`);
      err.statusCode = 404;
      throw err;
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
