import Pizza from '../models/Pizza.js';

/* GET pizzas */
export const getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find({ isAvailable: true });
    res.json(pizzas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* POST pizza (ADMIN) */
export const createPizza = async (req, res) => {
  try {
    const pizza = new Pizza(req.body);
    const savedPizza = await pizza.save();
    res.status(201).json(savedPizza);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
