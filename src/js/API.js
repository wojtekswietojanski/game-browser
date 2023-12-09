const API_KEY = "cbd5cb796e4c40119e2795975c8d3657";

async function fetchData(filter) {
  try {
    const res = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}${filter}`
    );
    return await res.json();
  } catch (error) {
    throw new Error(error);
  }
}
export default fetchData;
