interface ResultData {
	count: number;
	next: string | null;
	previous: string | null;
	results: City[]
}

interface City {
	city: string;
	city_ibge_code: number;
	confirmed: number;
	confirmed_per_100k_inhabitants: number;
	date: string;
	death_rate: number;
	deaths: number;
	estimated_population: number;
	estimated_population_2019: number;
	is_last: boolean;
	order_for_place: number;
	place_type: string;
	state: string;
}