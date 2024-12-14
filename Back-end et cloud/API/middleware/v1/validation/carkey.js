import vine from "@vinejs/vine";

const addSchema = vine.object({
  carId: vine.number().withoutDecimals().min(1)
})
const addValidator = vine.compile(addSchema)
export const addCarKeyValidatorMiddleware = async (req, res, next) => {
  const data = {
    carId: req.body.carId
  }
  try {
    req.val = await addValidator.validate(data);
    next();
  }
  catch(e) {
    res.status(400).send(e.messages);
  }
}

const updateSchema = vine.object({
  id: vine.number().withoutDecimals().min(1),
  carId: vine.number().withoutDecimals().min(1)
})
const updateValidator = vine.compile(updateSchema);
export const updateCarKeyValidatorMiddleware = async (req, res, next) => {
  const data = {
    id: req.body.id,
    carId: req.body.carId
  }
  try {
    req.val = await updateValidator.validate(data);
    next();
  }
  catch(e) {
    res.status(400).send(e.messages);
  }
}