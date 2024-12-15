import vine from "@vinejs/vine";

const startTripSchema = vine.object({
  vehicleId: vine.number().withoutDecimals(),
  startingDate: vine.date(),
  personId: vine.number().withoutDecimals(),
  startingLocation: vine.array(vine.number())
})
const startTripValidator = vine.compile(startTripSchema);
export const startTripValidatorMiddelware = async(req, res, next) => {
  const data = {
    vehicleId: req.body.vehicleId,
    startingDate: req.body.startingDate,
    personId: req.session.id,
    startingLocation: req.body.startingLocation
  }
  try {
    req.val = await startTripValidator.validate(data);
    next();
  } catch(e) {
    res.status(400).send(e.messages);
  }
}

const endTripSchema = vine.object({
  tripId: vine.number().withoutDecimals(),
  endingDate: vine.date(),
  endingLocation: vine.array(vine.number())
})
const endTripValidator = vine.compile(endTripSchema);
export const endTripValidatorMiddelware = async(req, res, next) => {
  const data = {
    tripId: req.body.tripId,
    endingDate: req.body.endingDate,
    endLocation: req.body.endLocation
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
  startingLocation: vine.array(vine.number()),
  endingLocation: vine.array(vine.number())
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
    startingLocation: req.body.startingLocation,
    endingLocation: req.body.endingLocation
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
  tripId: vine.number().withoutDecimals().min(1),
  vehicleId: vine.number().withoutDecimals().min(1).optional(),
  personId: vine.number().withoutDecimals().min(1).optional(),
  startingDate: vine.date().optional(),
  distance: vine.number().min(0).optional(),
  cost: vine.number().min(0).optional(),
  endingDate: vine.date().optional(),
  startingLocation: vine.array(vine.number()).optional(),
  endingLocation: vine.array(vine.number()).optional()
})
const updateValidator = vine.compile(addSchema);
export const updateTripValidatorMiddelware = async(req, res, next) => {
  const data = {
    tripId: req.body.tripId,
    vehicleId: req.body.vehicleId,
    personId: req.body.personId,
    startingDate: req.body.startingDate,
    distance: req.body.distance,
    cost: req.body.cost,
    endingDate: req.body.endingDate,
    startingLocation: req.body.startingLocation,
    endingLocation: req.body.endingLocation
  }
  try {
    req.val = await updateValidator.validate(data);
    next();
  }
  catch(e) {
    res.status(400).send(e.messages);
  }
}