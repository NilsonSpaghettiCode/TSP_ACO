/**
 * 
 * @param {*} request_address url or address
 * @returns Return object of data with cities
 */
async function loadDataCities(request_address) {
  let data = {};
  try {
    data = (await fetch(request_address)).json()
  } catch (error) {
    console.error(error)
  }
  return data;
}

export { loadDataCities };
