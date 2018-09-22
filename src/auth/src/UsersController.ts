import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();
import userService from './UsersRepository';

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

function authenticate(req: Request, res: Response, next: NextFunction) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(next);
}

function register(req: Request, res: Response, next: NextFunction) {
    userService.create(req.body)
        .then(res.json)
        .catch(next);
}

function getAll(_, res: Response, next: NextFunction) {
    userService.getAll()
        .then(res.json)
        .catch(next);
}

function getCurrent(req: any, res: Response, next: NextFunction) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(next);
}

function getById(req: Request, res: Response, next: NextFunction) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(next);
}

function update(req: Request, res: Response, next: NextFunction) {
    userService.update(req.params.id, req.body)
        .then(res.json)
        .catch(next);
}

function _delete(req: Request, res: Response, next: NextFunction) {
    userService.del(req.params.id)
        .then(res.json)
        .catch(next);
}


export default router;