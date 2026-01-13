import express from 'express';
import {
    getPizzas,
    createPizza
} from '../controllers/pizzaController.js';

const router = express.Router();

router.get('/', getPizzas);
router.post('/', createPizza);

export default router;
