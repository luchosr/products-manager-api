import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  createProduct,
  getProducts,
  getProductsById,
  updateAvailability,
  updateProduct,
} from './handlers/products';
import { handleInputErrors } from './middleware';

const router = Router();

router.get('/', getProducts);
router.get(
  '/:id',
  param('id').isNumeric().withMessage('Id must be numeric'),
  handleInputErrors,
  getProductsById
);

router.post(
  '/',

  body('name').notEmpty().withMessage('Name is required'),
  body('price')
    .isNumeric()
    .withMessage('Value must be numeric')
    .notEmpty()
    .withMessage('Value cannot be empty')
    .custom((value) => value > 0)
    .withMessage('Price is not valid'),
  handleInputErrors,
  createProduct
);

router.put(
  '/:id',
  body('name').notEmpty().withMessage('Name is required'),
  body('price')
    .isNumeric()
    .withMessage('Value must be numeric')
    .notEmpty()
    .withMessage('Value cannot be empty')
    .custom((value) => value > 0)
    .withMessage('Price is not valid'),
  body('availability')
    .isBoolean()
    .withMessage('Availability value is not valid'),
  handleInputErrors,
  updateProduct
);

router.patch('/:id', updateAvailability);

router.delete('/', (req, res) => {
  res.json('Desde DELETE');
});

export default router;
