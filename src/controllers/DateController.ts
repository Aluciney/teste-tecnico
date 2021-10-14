import { Request, Response } from 'express';
import api from '../services/api';
import apiBrasilIO from '../services/apiBrasilIO';
import axios from 'axios';

interface ResultConsult {
	data: ResultData;
}

const DateController = {
	index: async (req: Request, res: Response) => {
		try {
			const { state, dateStart, dateEnd } = req.query;

			const { data }: ResultConsult = await apiBrasilIO.get(`/dataset/covid19/caso/data`, {
				params: {
					state,
					date: dateEnd,
					page_size: 10000
				}
			});

			// Sort by percentage of confirmed cases and number of population
			let top_cidades = data.results
				// Filters those that have confirmed cases and those that have the amount of population 
				.filter(city => (!!city.estimated_population && !!city.confirmed))
				// Assign percentage of confirmed cases and population amount
				.map(city => ({ ...city, percentage_of_confirmed_cases: ((city.confirmed * 100) / city.estimated_population) }))
				// Order by percentage of confirmed cases and population amount
				.sort((a, b) => b.percentage_of_confirmed_cases - a.percentage_of_confirmed_cases);

			// Formats and filters the first 10 records
			let cities_formated = top_cidades.filter((city,key) => key < 10).map((city, key) => ({
				id: key,
				nomeCidade: city.city,
				percentualDeCasos: parseFloat(city.percentage_of_confirmed_cases.toFixed(2))
			}));

			let errors = [];
			for(var count = 0; count < cities_formated.length; count ++){
				try {
					await api.post('/testApi', cities_formated[count]);
				} catch (error) {
					if (axios.isAxiosError(error)) {
						errors.push(error.message);
					}else{
						errors.push(`Erro ao tentar inserir o resultado ${count}`);
					}
				}
			}
			
			if(errors.length > 0){
				return res.status(404).json({ message: 'Aconteceram alguns erros durante o processo.', errors });
			}

			return res.status(200).json(cities_formated);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					return res.status(error.response.status).json(error.response.data);
				}
				return res.status(404).json({ message: error.message });
			}
			return res.status(404).json({ error: 'Erro ao ler dados via GET' });
		}
	}

};

export { DateController };