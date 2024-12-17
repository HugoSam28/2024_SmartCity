import vine from "@vinejs/vine";

const startTripSchema = vine.object({
  vehicleId: vine.number().withoutDecimals(),
  startingDate: vine.date(),
  personId: vine.number().withoutDecimals(),
  startingLocationLon: vine.number(),
  startingLocationLat: vine.number()
})
const startTripValidator = vine.compile(startTripSchema);
export const startTripValidatorMiddelware = async(req, res, next) => {
  const data = {
    vehicleId: req.body.vehicleId,
    startingDate: req.body.startingDate,
    personId: req.session.id,
    startingLocationLon: req.body.startingLocationLon,
    startingLocationLat: req.body.startingLocationLat
  }
  try {
    req.val = await startTripValidator.validate(data);
    next();
  } catch(e) {
    res.status(400).send(e.messages);
  }
}

const endTripSchema = vine.object({
  id: vine.number().withoutDecimals().min(1),
  endingDate: vine.date(),
  endingLocationLon: vine.number(),
  endingLocationLat: vine.number()
})
const endTripValidator = vine.compile(endTripSchema);
export const endTripValidatorMiddelware = async(req, res, next) => {
  const data = {
    id: req.body.id,
    endingDate: req.body.endingDate,
    endingLocationLon: req.body.endingLocationLon,
    endingLocationLat: req.body.endingLocationLat
  }
  try {
    req.val = await endTripValidator.validate(data);
    next();
  } catch(e) {
    res.status(400).send(e.messages);
  }
}

const addSchema = vine.object({
  vehicleId: vine.number().withoutDecimals().min(1),
  personId: vine.number().withoutDecimals().min(1),
  startingDate: vine.date(),
  distance: vine.number().min(0),
  cost: vine.number().min(0),
  endingDate: vine.date(),
  startingLocationLon: vine.number(),
  startingLocationLat: vine.number(),
  endingLocationLon: vine.number(),
  endingLocationLat: vine.number()
})
const addValidator = vine.compile(addSchema);
export const addTripValidatorMiddelware = async(req, res, next) => {
  const data = {
    vehicleId: req.body.vehicleId,
    personId: req.body.personId,
    startingDate: req.body.startingDate,
    distance: req.body.distance,
    cost: req.body.cost,
    endingDate: req.body.endingDate,
    startingLocationLon: req.body.startingLocationLon,
    startingLocationLat: req.body.startingLocationLat,
    endingLocationLon: req.body.endingLocationLon,
    endingLocationLat: req.body.endingLocationLat
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
  vehicleId: vine.number().withoutDecimals().min(1).optional(),
  personId: vine.number().withoutDecimals().min(1).optional(),
  startingDate: vine.date().optional(),
  distance: vine.number().min(0).optional(),
  cost: vine.number().min(0).optional(),
  endingDate: vine.date().optional(),
  startingLocationLon: vine.number().optional(),
  startingLocationLat: vine.number().optional(),
  endingLocationLon: vine.number().optional(),
  endingLocationLat: vine.number().optional()
})
const updateValidator = vine.compile(updateSchema);
export const updateTripValidatorMiddelware = async(req, res, next) => {
  const data = {
    id: req.body.id,
    vehicleId: req.body.vehicleId,
    personId: req.body.personId,
    startingDate: req.body.startingDate,
    distance: req.body.distance,
    cost: req.body.cost,
    endingDate: req.body.endingDate,
    startingLocationLon: req.body.startingLocationLon,
    startingLocationLon: req.body.startingLocationLon,
    endingLocationLat: req.body.endingLocationLon,
    endingLocationLat: req.body.endingLocationLat
  }
  try {
    req.val = await updateValidator.validate(data);
    next();
  }
  catch(e) {
    res.status(400).send(e.messages);
  }
}