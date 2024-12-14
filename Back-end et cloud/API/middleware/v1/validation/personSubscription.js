import vine from "@vinejs/vine";

const addSchema = vine.object({
  personId: vine.number().withoutDecimals().min(1),
  subscriptionId: vine.number().withoutDecimals().min(1),
  startingSubscriptionDate: vine.date(),
})
const addValidator = vine.compile(addSchema)
export const addPersonSubscriptionValidatorMiddleware = async (req, res, next) => {
  const data = {
    personId: req.body.personId,
    subscriptionId: req.body.subscriptionId,
    startingSubscriptionDate: req.body.startingSubscriptionDate,
  }
  try {
    req.val = await addValidator.validate(data);
    next();
  }
  catch(e) {
    console.error(e);
    res.sendStatus(400);
  }
}

const updateSchema = vine.object({
  id: vine.number().withoutDecimals().min(1),
  personId: vine.number().withoutDecimals().min(1).optional(),
  subscriptionId: vine.number().withoutDecimals().min(1).optional(),
  startingSubscriptionDate: vine.date().optional(),
})
const updateValidator = vine.compile(updateSchema);
export const updatePersonSubscriptionalidatorMiddleware = async (req, res, next) => {
  const data = {
    id: req.body.id,
    personId: req.body.personId,
    subscriptionId: req.body.subscriptionId,
    startingSubscriptionDate: req.body.startingSubscriptionDate
  }
  try {
    req.val = await updateValidator.validate(data);
    next();
  }
  catch(e) {
    console.error(e);
    res.sendStatus(400);
  }
}