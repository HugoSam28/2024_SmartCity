import vine from "@vinejs/vine";

const startTripSchema = vine.object({
  vehicleId: vine.number().withoutDecimals(),
  startingDate: vine.date(),
  personId: vine.number().withoutDecimals(),
  startingLocation: vine.array(vine.number())})
const startTripValidator = vine.compile(tripSchema);
export const startTripValidatorMiddelware = async(req, res, next) => {
  const data = {
    vehicleId: req.body.vehiclId,
    startingDate: req.body.startingDate,
    personId: req.session.id,
    startingLocation: req.body.startingLocation
  }
  try {
    req.val = await startTripValidator.validate(data);
    next();
  } catch(e) {
    console.error(e);
    res.sendStatus(500);
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
    console.error(e);
    res.sendStatus(500);
  }
}