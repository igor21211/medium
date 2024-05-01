import axios from '@/api/axios';

const getFeed = (apiUrl) => {
  return axios.get(apiUrl);
};

export default {
  getFeed,
};
// Compare this snippet from src/api/feed.js:
