export async function fetchCity(selectedCountry) {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({country: `${selectedCountry}` }),
    });
    const response = await res.json();
    console.log(response);
    return response.data.map(city => ({'name': city}))
}