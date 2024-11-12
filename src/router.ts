import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  createProduct,
  deleteProduct,
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
  param('id').isNumeric().withMessage('Id must be numeric'),
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

router.patch(
  '/:id',
  param('id').isNumeric().withMessage('Id must be numeric'),
  handleInputErrors,
  updateAvailability
);

router.delete(
  '/:id',
  param('id').isNumeric().withMessage('Id must be numeric'),
  handleInputErrors,
  deleteProduct
);

export default router;
