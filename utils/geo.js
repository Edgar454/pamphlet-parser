import axios from 'axios';

const RAPID_API_KEY = process.env.EXPO_PUBLIC_RAPID_API_KEY;

export const fetchGeoLocation = async (location) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://google-map-places.p.rapidapi.com/maps/api/geocode/json',
      params: {
        address: location,
        language: 'en',
        region: 'en',
        result_type: 'administrative_area_level_1',
        location_type: 'APPROXIMATE',
      },
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': 'google-map-places.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    const result = response.data.results[0];

    return {
      id: result.place_id,
      location: {
        latitude: parseFloat(result.geometry.location.lat),
        longitude: parseFloat(result.geometry.location.lng),
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      },
    };
  } catch (error) {
    console.error(`Failed to fetch geocode for "${location}":`, error);
    return null; 
  }
};