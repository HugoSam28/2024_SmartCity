import vine from "@vinejs/vine";

const personSchema = vine.object({
  firstName: vine.string(),
  lastName: vine.string(),
  email: vine.string().email(),
  password: vine.string(),
  referralCode: vine.string().optional(),
  phoneNumber: vine.string().regex(/^\+[1-9][0-9]{7,14}$/),
  birthday: vine.date(),
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
    phoneNumber: req.body.phoneNumber,
    birthday: req.body.birthday,
    hasCarLicence: req.body.hasCarLicence,
    hasMotorbikeLicence: req.body.hasMotorbikeLicence
  }
  try {
    req.val = await personValidator.validate(data);
    next();
  }
  catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
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
export async function personUpdateValidatorMiddleware(req, res, next) {
  const data = {
    id: req.session.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    hasCarLicence: req.body.hasCarLicence,
    hasMotorbikeLicence: req.body.hasMotorbikeLicence,
  };
  try {
    req.val = await updatePersonValidator.validate(data);
    next();
  } catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
}

// Car un user ne peut pas modifier sa propre date de naissance, ni son role, ni le referralCode
// un admin ne peut modifier le mot de passe d'un user
const updatePersonSchemaViaAdmin = vine.object({
  id: vine.number(),
  firstName: vine.string().optional(),
  lastName: vine.string().optional(),
  email: vine.string().email().optional(),
  phoneNumber: vine.string().regex(/^\+[1-9][0-9]{7,14}$/).optional(),
  birthday: vine.date().optional(),
  referralCode: vine.string().optional(),
  balance: vine.number().optional(),
  role: vine.string().optional(),
  hasCarLicence: vine.boolean().optional(),
  hasMotorbikeLicence: vine.boolean().optional()
})
const updatePersonValidatorViaAdmin = vine.compile(updatePersonSchemaViaAdmin);
export async function personUpdateValidatorMiddlewareViaAdmin(req, res, next) {
  const data = {
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    birthday: req.body.birthday,
    referralCode: req.body.referralCode,
    balance: req.body.balance,
    role: req.body.role,
    hasCarLicence: req.body.hasCarLicence,
    hasMotorbikeLicence: req.body.hasMotorbikeLicence,
  };
  try {
    req.val = await updatePersonValidatorViaAdmin.validate(data);
    next();
  } catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
}




const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string(),
})
const loginValidator = vine.compile(loginSchema);
export async function loginValidatorMiddleware(req, res, next) {
  const data = {
    email: req.body.email,
    password: req.body.password
  };
  try {
    req.val = await loginValidator.validate(data);
    next();
  } catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
}
