import vine from "@vinejs/vine";

const pageSchema = vine.object({
  iPage: vine.number().withoutDecimals().min(1)
});
const pageValidator = vine.compile(pageSchema);
export const pageValidatorMiddleware = async (req, res, next) => {
  let data = {
    iPage: req.params.iPage !== undefined ? req.params.iPage : req.body.iPage
  }
  try {
    req.val = {...req.val, page: await pageValidator.validate(data)}
    next();
  } catch (e) {
    res.status(400).send(e.messages);
  }
}

/**
 * @swagger
 * components:
 *  schemas:
 *      deleteSchema:
 *        type: array
 *        items:
 *          type: integer
 */

const deleteSchema = vine.object({
  idList: vine.array(vine.number().withoutDecimals().min(1))
})
const deleteValidator = vine.compile(deleteSchema);
export async function deleteValidatorMiddleware(req, res, next) {
  const data = {
    idList: req.body.idList
  }
  try {
    req.val = { ...req.val, del:await deleteValidator.validate(data)}
    next();
  } catch(e) {
    res.status(400).send(e.messages);
  }
}

const searchSchema = vine.object({
  value: vine.string()
})
const searchValidator = vine.compile(searchSchema);
export const searchValidatorMiddleware = async (req, res, next) => {
  const data = {
    value: req.params.search !== undefined ? req.params.search : req.body.search
  }
  try {
    req.val = { ...req.val, search: await searchValidator.validate(data)}
    next();
  } catch (e) {
    res.status(400).send(e.messages);
  }
}

const orderSchema = vine.object({
  column: vine.string()
})
const orderValidator = vine.compile(orderSchema);
export const orderValidatorMiddleware = async (req, res, next) => {
  const data = {
    column: req.params.column !== undefined ? req.params.column : req.body.column
  }
  try {
    req.val = { ...req.val, order: await orderValidator.validate(data)};
    next();
  } catch (e) {
    res.status(400).send(e.messages);
  }
}
const idSchema = vine.object({
  id: vine.number().withoutDecimals().min(1)
})
const idValidator = vine.compile(idSchema);
export const idValidatorMiddleware = async (req, res, next) => {
  const data = {
    id: req.params.id
  }
  try {
    req.val = {id: await idValidator.validate(data)}
    next();
  }
  catch(e) {
    res.status(400).send(e.messages);
  }
}
