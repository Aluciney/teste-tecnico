import { NextFunction, Request, Response } from 'express';
import { parseISO } from 'date-fns';

export default async (req: Request, res: Response, next: NextFunction) => {
	const { state, dateStart, dateEnd } = req.query;

	if (!state || !dateStart || !dateEnd) {
		return res.status(404).json({ error: 'Informe todos os compos obrigatórios' });
	}

	if (typeof state !== 'string' || typeof dateStart !== 'string' || typeof dateEnd !== 'string') {
		return res.status(404).json({ error: 'Formato dos compos inválido' });
	}

	try {
		const dateStartConverted = parseISO(dateStart);
		const dateEndConverted = parseISO(dateEnd);

		if(dateStartConverted.getTime() > dateEndConverted.getTime()){
			return res.status(404).json({ error: 'Data inicial está superior a data final' });
		}

		return next();
	} catch (error) {
		return res.status(404).json({ error: 'Formato de data inválido' });
	}
};