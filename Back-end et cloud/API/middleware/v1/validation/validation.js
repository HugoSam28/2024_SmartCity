import vine from "@vinejs/vine";

const pageSchema = vine.object({
  iPage: vine.number().withoutDecimals().min(1)
});
const pageValidator = vine.compile(pageSchema);
export const pageValidatorMiddleware = async (req, res, next) => {
  let data = {
    iPage: req.params.iPage,
  }
  try {
    req.val = {...req.val, page: await pageValidator.validate(data)}
    next();
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}
const deleteSchema = vine.object({
  idList: vine.array(vine.number().withoutDecimals().min(1))
})
const deleteValidator = vine.compile(deleteSchema);
export async function deleteValidatorMiddleware(req, res, next) {
  const data = {
    idList: req.body.idList
  }
  try {
    req.val = { ...req.val, del: await deleteValidator.validate(data)}
    next();
  } catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
}

const searchSchema = vine.object({
  value: vine.string()
})
const searchValidator = vine.compile(searchSchema);
export const searchValidatorMiddleware = async (req, res, next) => {
  const data = {
    value: req.params.search
  }
  try {
    req.val = { ...req.val, search: await searchValidator.validate(data)}
    next();
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

const orderSchema = vine.object({
  column: vine.string()
})
const orderValidator = vine.compile(orderSchema);
export const orderValidatorMiddleware = async (req, res, next) => {
  const data = {
    column: req.params.order
  }
  try {
    req.val = { ...req.val, order: await orderValidator.validate(data)};
    console.log(req.val);
    next();
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

/**
 * @swagger
 * components:
 *  schemas:
 *      deleteSchema:
 *          type: object
 *          properties:
 *            idList:
 *              type: array
 *              items:
 *                type: integer
 *          example: "{idList: [1,3,8]}"
 */

