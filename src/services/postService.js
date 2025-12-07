const { fetchPosts, fetchPostById } = require("../api/jsonPlaceholderClient");
const { savePostsToCache, readPostsFromCache } = require("../utils/cache");

let inMemoryPosts = null;

async function getAllPosts({ forceRefresh = false } = {}) {
  if (!forceRefresh && Array.isArray(inMemoryPosts)) {
    return inMemoryPosts;
  }

  if (!forceRefresh) {
    const fileCachedPosts = readPostsFromCache();
    if (Array.isArray(fileCachedPosts)) {
      inMemoryPosts = fileCachedPosts;
      return inMemoryPosts;
    }
  }

  const posts = await fetchPosts();
  inMemoryPosts = posts;
  savePostsToCache(posts);
  return posts;
}

async function getFilteredPosts({
  userId,
  title,
  limit,
  forceRefresh = false,
}) {
  const posts = await getAllPosts({ forceRefresh });

  let result = posts;

  if (userId) {
    result = result.filter((p) => String(p.userId) === String(userId));
  }

  if (title) {
    const query = title.toLowerCase();
    result = result.filter((p) => p.title.toLowerCase().includes(query));
  }

  if (limit && !Number.isNaN(Number(limit))) {
    result = result.slice(0, Number(limit));
  }

  return result;
}

async function getPostDetails(id) {
  const posts = await getAllPosts();

  const fromCache = posts.find((p) => String(p.id) === String(id));
  if (fromCache) return fromCache;

  const fromApi = await fetchPostById(id);
  return fromApi;
}

module.exports = {
  getAllPosts,
  getFilteredPosts,
  getPostDetails,
};
