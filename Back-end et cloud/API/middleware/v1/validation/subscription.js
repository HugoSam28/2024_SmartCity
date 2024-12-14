import vine from "@vinejs/vine";

/**
 * @swagger
 * components:
 *  schemas:
 *    addSubscription
 *      type: object
 *      properties:
 *        label:
 *          type: string
 *        price:
 *          type: number
 *        discount:
 *          type: number
 *          minimum: 0
 *          maximum: 1
 *        payment_recurrence:
 *          type: string
 *        vehicle_type:
 *          type: string
 *      required:
 *        - label
 *        - price
 *        - discount
 *        - payment_recurrence
 *        - vehicle_type
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
    console.error(e);
    res.sendStatus(500);
  }
}

/**
 * @swagger
 * components:
 *  schemas:
 *    addSubscription:
 *      type: object
 *      properties:
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
 *        payment_recurrence:
 *          type: string
 *        vehicle_type:
 *          type: string
 *      required:
 *        - id
 */


const updateSchema = vine.object({
  id: vine.number().withoutDecimals().min(1),
  label: vine.string(),
  price: vine.number().min(0),
  discount: vine.number().min(0).max(1),
  paymentRecurrence: vine.enum(['weekly', 'monthly', 'yearly']),
  vehicleType: vine.enum(['Voiture', 'Scooter', 'Trotinette', 'Velo'])
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
    console.error(e);
    res.sendStatus(500);
  }
}