import vine from "@vinejs/vine";

const addSchema = vine.object({
  lat: vine.number(),
  lon: vine.number(),
  batteryLevel: vine.number().min(0).max(100),
  type: vine.enum(['Voiture', 'Scooter', 'Trotinette', 'Velo']),
  price: vine.number().min(0),
  isAvailable: vine.boolean(),
  fees: vine.number().min(0),
  brand: vine.string().optional(),
  model: vine.string().optional(),
  chassisNumber: vine.string().optional()
})
const addValidator = vine.compile(addSchema)
export const addVehicleValidatorMiddleware = async (req, res, next) => {
  const data = {
    lat: req.body.lat,
    lon: req.body.lon,
    batteryLevel: req.body.batteryLevel,
    type: req.body.type,
    price: req.body.price,
    isAvailable: req.body.isAvailable,
    fees: req.body.fees,
    brand: req.body.brand,
    model: req.body.model,
    chassisNumber: req.body.chassisNumber
  }
  try {
    if(data.type === 'Voiture' || data.type === 'Scooter') {
      if(!data.brand || data.model || data.chassisNumber) {
        throw Error("Ce type de vehicle doit avoir les champs : brand, model et chassisNumber");
      }
    }
    req.val = await addValidator.validate(data);
    next();
  }
  catch(e) {
    res.status(400).send(e.messages);
  }
}

const updateSchema = vine.object({
  id: vine.number().withoutDecimals().min(1),
  lat: vine.number().optional(),
  lon: vine.number().optional(),
  batteryLevel: vine.number().optional(),
  type: vine.enum(['Voiture', 'Scooter', 'Trotinette', 'Velo']).optional(),
  price: vine.number().min(0).optional(),
  isAvailable: vine.boolean().optional(),
  fees: vine.number().min(0).optional(),
  brand: vine.string().optional(),
  model: vine.string().optional(),
  chassisNumber: vine.string().optional()
})
const updateValidator = vine.compile(updateSchema);
export const updateVehicleValidatorMiddleware = async (req, res, next) => {
  const data = {
    id: req.body.id,
    lat: req.body.lat,
    lon: req.body.lon,
    batteryLevel: req.body.batteryLevel,
    type: req.body.type,
    price: req.body.price,
    isAvailable: req.body.isAvailable,
    fees: req.body.fees,
    brand: req.body.brand,
    model: req.body.model,
    chassisNumber: req.body.chassisNumber
  }
  try {
    req.val = await updateValidator.validate(data);
    next();
  }
  catch(e) {
    res.status(400).send(e.messages);
  }
}