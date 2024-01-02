export async function getAddress(ip){
 const response = await fetch(`
  https://geo.ipify.org/api/v2/country,city?apiKey=at_HgMnfHdqiakj39VtKjI3PCaOnUweP&ipAddress=${ip}`);
  return await response.json();
}