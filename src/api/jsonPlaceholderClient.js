const axios = require("axios");

const jsonPlaceholderClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

async function fetchPosts() {
  try {
    const response = await jsonPlaceholderClient.get("/posts");

    if (!Array.isArray(response.data)) {
      throw new Error("Invalid response shape: expected an array of posts");
    }

    return response.data;
  } catch (error) {
    handleAxiosError(error, "Error fetching posts from external API");
  }
}

async function fetchPostById(id) {
  try {
    const response = await jsonPlaceholderClient.get(`/posts/${id}`);

    if (!response.data || !response.data.id) {
      const notFoundError = new Error(
        `Post with id=${id} not found in external API`
      );
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    return response.data;
  } catch (error) {
    handleAxiosError(error, `Error fetching post id=${id} from external API`);
  }
}

function handleAxiosError(error, defaultMessage) {
  if (error.response) {
    const err = new Error(
      `${defaultMessage}: Received status ${error.response.status}`
    );
    err.statusCode = error.response.status;
    throw err;
  } else if (error.request) {
    const err = new Error(
      `${defaultMessage}: No response from server (network issue or timeout)`
    );
    err.statusCode = 503;
    throw err;
  } else {
    const err = new Error(`${defaultMessage}: ${error.message}`);
    err.statusCode = 500;
    throw err;
  }
}

module.exports = {
  fetchPosts,
  fetchPostById,
};
