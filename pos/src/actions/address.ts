"use server";

import type { Country, State, City } from "@/lib/definitions";

//API functions
const API_KEY = process.env.COUNTRY_STATE_CITY_API_KEY;
const BASE_URL = "https://api.countrystatecity.in/v1";

const headers = {
  "X-CSCAPI-KEY": API_KEY || "",
};

export async function getCountries(): Promise<Country[]> {
  try {
    const response = await fetch(`${BASE_URL}/countries`, {
      headers,
      // Add cache control for better performance
      cache: "force-cache",
    });

    if (!response.ok) throw new Error("Failed to fetch countries");
    return response.json();
  } catch (error) {
    console.error("Error fetching countries: ", error);
    return [];
  }
}

export async function getStates(countryCode: string): Promise<State[]> {
  console.log("countryCode", countryCode);
  if (!countryCode) return [];

  try {
    const response = await fetch(
      `${BASE_URL}/countries/${countryCode}/states`,
      { headers, cache: "force-cache" }
    );
    if (!response.ok) throw new Error("Failed to fetch states");
    return response.json();
  } catch (error) {
    console.error("Error fetching states:", error);
    return [];
  }
}

export async function getCities(
  countryCode: string,
  stateCode: string
): Promise<City[]> {
  if (!countryCode || !stateCode) return [];

  try {
    const response = await fetch(
      `${BASE_URL}/countries/${countryCode}/states/${stateCode}/cities`,
      { headers, cache: "force-cache" }
    );
    if (!response.ok) throw new Error("Failed to fetch cities");
    return response.json();
  } catch (error) {
    console.error("Error fetching states:", error);
    return [];
  }
}
