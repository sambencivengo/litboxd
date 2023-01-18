import { Request, Response } from 'express';
import { EntityManager } from 'typeorm';

export type ApolloContext = {
	em: EntityManager;
	req: Request;
	res: Response;
};
