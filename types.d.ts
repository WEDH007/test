type University = {
    "country": string,
    "alpha_two_code": string,
    "name": string,
    "state-province": string | null,
    "domains": string[],
    "web_pages": string[],
}

type Population = {
    "ID_Nation": string,
    "Nation": string,
    "ID_Year": string,
    "Year": string,
    "Population": number,
    "Slug Nation": string
}
