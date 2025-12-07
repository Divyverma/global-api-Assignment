const fs = require("fs");
const path = require("path");

const CACHE_FILE = path.join(__dirname, "../../cache/posts.json");

function savePostsToCache(posts) {
  try {
    fs.writeFileSync(
      CACHE_FILE,
      JSON.stringify({ savedAt: new Date().toISOString(), posts }, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Failed to write posts cache:", error.message);
  }
}

function readPostsFromCache() {
  try {
    if (!fs.existsSync(CACHE_FILE)) {
      return null;
    }

    const content = fs.readFileSync(CACHE_FILE, "utf-8");
    const parsed = JSON.parse(content);

    if (!parsed.posts || !Array.isArray(parsed.posts)) {
      return null;
    }

    return parsed.posts;
  } catch (error) {
    console.error("Failed to read posts cache:", error.message);
    return null;
  }
}

module.exports = {
  savePostsToCache,
  readPostsFromCache,
};
