import vine from "@vinejs/vine";

/**
 * @swagger
 * components:
 *  schemas:
 *    addSubscription:
 *      type: object
 *      properties:
 *        iPage:
 *          type: integer
 *        column:
 *          type: string
 *        label:
 *          type: string
 *        price:
 *          type: number
 *        discount:
 *          type: number
 *          minimum: 0
 *          maximum: 1
 *        paymentRecurrence:
 *          type: string
 *        vehicleType:
 *          type: string
 *      required:
 *        - iPage
 *        - column
 *        - label
 *        - price
 *        - discount
 *        - paymentRecurrence
 *        - vehicleType
 */

const addSchema = vine.object({
  label: vine.string(),
  price: vine.number().min(0),
  discount: vine.number().min(0).max(1),
  paymentRecurrence: vine.enum(['weekly', 'monthly', 'yearly']),
  vehicleType: vine.enum(['Voiture', 'Scooter', 'Trotinette', 'Velo'])
})
const addValidator = vine.compile(addSchema)
export const addSubscriptionValidatorMiddleware = async (req, res, next) => {
  const data = {
    label: req.body.label,
    price: req.body.price,
    discount: req.body.discount,
    paymentRecurrence: req.body.paymentRecurrence,
    vehicleType: req.body.vehicleType,
  }
  try {
    req.val = await addValidator.validate(data);
    next();
  }
  catch(e) {
    res.status(400).send(e.messages);
  }
}

/**
 * @swagger
 * components:
 *  schemas:
 *    updateSubscription:
 *      type: object
 *      properties:
 *        iPage:
 *          type: integer
 *        column:
 *          type: string
 *        id:
 *          type: integer
 *        label:
 *          type: string
 *        price:
 *          type: number
 *        discount:
 *          type: number
 *          minimum: 0
 *          maximum: 1
 *        paymentRecurrence:
 *          type: string
 *        vehicleType:
 *          type: string
 *      required:
 *        - iPage
 *        - column
 *        - id
 */


const updateSchema = vine.object({
  id: vine.number().withoutDecimals().min(1),
  label: vine.string().optional(),
  price: vine.number().min(0).optional(),
  discount: vine.number().min(0).max(1).optional(),
  paymentRecurrence: vine.enum(['weekly', 'monthly', 'yearly']).optional(),
  vehicleType: vine.enum(['Voiture', 'Scooter', 'Trotinette', 'Velo']).optional()
})
const updateValidator = vine.compile(updateSchema);
export const updateSubscriptionValidatorMiddleware = async (req, res, next) => {
  const data = {
    id: req.body.id,
    label: req.body.label,
    price: req.body.price,
    discount: req.body.discount,
    paymentRecurrence: req.body.paymentRecurrence,
    vehicleType: req.body.vehicleType,
  }
  try {
    req.val = await updateValidator.validate(data);
    next();
  }
  catch(e) {
    res.status(400).send(e.messages);
  }
}