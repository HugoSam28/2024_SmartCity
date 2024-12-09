import vine from "@vinejs/vine";

const personSchema = vine.object({
  firstName: vine.string(),
  lastName: vine.string(),
  email: vine.string().email(),
  password: vine.string(),
  referralCode: vine.string().optional(),
  phoneNumber: vine.string().regex(/^\+[1-9][0-9]{7,14}$/),
  hasCarLicence: vine.boolean(),
  hasMotorbikeLicence: vine.boolean()
})
const personValidator = vine.compile(personSchema);

export async function personValidatorMiddleware(req, res, next) {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    referralCode: req.body.referralCode,
    phoneNumber: req.body.phoneNumber
  }
  req.val = await personValidator.validate(data);
  next();
}

const updatePersonSchema = vine.object({
  id: vine.number(),
  firstName: vine.string().optional(),
  lastName: vine.string().optional(),
  email: vine.string().email().optional(),
  password: vine.string().optional(),
  phoneNumber: vine.string().regex(/^\+[1-9][0-9]{7,14}$/).optional(),
  hasCarLicence: vine.boolean().optional(),
  hasMotorbikeLicence: vine.boolean().optional()
})
const updatePersonValidator = vine.compile(updatePersonSchema);

export async function personUpdateValidatiorMiddleware(req, res, next) {
  const data = {
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    hasCarLicence: req.body.hasCarLicense,
    hasMotorbikeLicence: req.body.hasMotorBikeLicense,
  }
  req.val = await updatePersonValidator.validate(data);
  next();
}

const loginSchema = vine.object({
  username: vine.string().email(),
  password: vine.string(),
})
const loginValidator = vine.compile(loginSchema);
export async function loginValidatorMiddleware(req, res, next) {
  const data = {
    username: req.body.username,
    password: req.body.password
  }
  req.val = await loginValidator.validate(data);
  next();
}