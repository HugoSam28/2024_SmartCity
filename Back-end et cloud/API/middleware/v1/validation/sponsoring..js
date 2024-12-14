import vine from "@vinejs/vine";
/**
 * @swagger
 * components:
 *  schemas:
 *    addSponsoring:
 *      type: object
 *      properties:
 *        iPage:
 *          type: integer
 *        column:
 *          type: string
 *        referred:
 *          type: integer
 *        sponsor:
 *          type: integer
 *      required:
 *        - iPage
 *        - column
 *        - referred
 *        - sponsor
 */
const addSchema = vine.object({
  sponsor: vine.number().withoutDecimals().min(1),
  referred: vine.number().withoutDecimals().min(1)
})
const addValidator = vine.compile(addSchema);
export const sponsoringValidatorMiddleware = async (req, res, next) => {
  const data = {
    sponsor: req.body.sponsor,
    referred: req.body.referred
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
 *    updateSponsoring:
 *      type: object
 *      properties:
 *        iPage:
 *          type: integer
 *        column:
 *          type: string
 *        referred:
 *          type: integer
 *        sponsor:
 *          type: integer
 *      required:
 *        - iPage
 *        - column
 *        - referred
 */

const updateSchema = vine.object({
  sponsor: vine.number().withoutDecimals().min(1).optional(),
  referred: vine.number().withoutDecimals().min(1),
})
const updateValidator = vine.compile(updateSchema);
export const updateSponsoringValidatorMiddleware = async (req, res, next) => {
  const data = {
    sponsor: req.body.sponsor,
    referred: req.body.referred
  }
  try {
    req.val = await updateValidator.validate(data);
    next();
  }
  catch(e) {
    res.status(400).send(e.messages);
  }
}