export async function fetchCountries() {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/positions");
    const response = await res.json();
    return response.data; 
}


