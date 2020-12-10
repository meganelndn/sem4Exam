export async function fetchData(url, showSection) {
    const response = await fetch(url);
    const jsonData = await response.json();
    showSection(jsonData)
}

  
//------convert time format--------//
/* export const urlApi = "https://beer-waffle-again.herokuapp.com/";
export const urlDetails = "https://beer-waffle-again.herokuapp.com/beertypes";

export const resdbEndpoint = "https://frontend2020-db3c.restdb.io/rest/beer-price";
export const resdbApiKey = "5e95774d436377171a0c233c";

export function dateFormatter(timestamp) {
  //console.log(timestamp);
  let date = new Date(timestamp);
  let hours = date.getHours();
  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  let seconds = "0" + date.getSeconds();
  let newTimeFormatted =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  //console.log(newTimeFormatted)
  return newTimeFormatted;
}; */