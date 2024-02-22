import axios from 'axios';

const apiUrl = process.env.REACT_APP_NAGER_URL;
const headers = { accept: 'text/plain' };

export const ApiCalls = {
  GetWorldwideHolidays: async () => {
    const contryCode = 'us';
    try {
      const response = await axios.get(`${apiUrl}NextPublicHolidays/${contryCode}`, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
