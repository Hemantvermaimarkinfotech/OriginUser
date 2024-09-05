// apiService.js

import axios from "react-native-axios";



export const getArrivals = async (category_slug) => {

  try {
    console.log("category_slugggggggg",category_slug)
    const response = await axios.get(
    
      `https://staging11.originmattress.com.sg/wp-json/wc-product-api/v1/products/?category_slug=${category_slug}`,
      {
        category_slug: category_slug
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data; // Return the data
  } catch (error) {
    console.error('Error fetching Arrivals:', error);
    throw error;
  }
};


export const getPopular = async () => {

  try {
    
    const response = await axios.get(
    
      'https://staging11.originmattress.com.sg/wp-json/wc-product-api/v1/products/',
      
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data; // Return the data
  } catch (error) {
    console.error('Error fetching popular:', error);
    throw error;
  }
};

export const getCategory = async () => {
  try {
    const response = await axios.get(
      `https://staging11.originmattress.com.sg/wp-json/wc-product-api/v1/categories`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data; // Return the data
  } catch (error) {
    console.error('Error fetching Category:', error);
    throw error;
  }
};













