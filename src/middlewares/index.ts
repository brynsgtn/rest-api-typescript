import express from 'express';
import { get, merge } from 'lodash';

import { getUsersBySessionToken } from '../db/users';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['TypeScript-Auth'];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUsersBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { user: existingUser });
        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};