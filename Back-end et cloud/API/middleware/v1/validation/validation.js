import vine from "@vinejs/vine";

const pageSchema = vine.object({
  iPage: vine.number().withoutDecimals().min(1)
});

const pageValidator = vine.compile(pageSchema);

export const pageValidatorMiddleware = async (req, res, next) => {
  let data = {
    iPage: req.body.iPage,
  }
  try {
    req.val.page = await pageValidator.validate(data);
    next();
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

const deleteSchema = vine.object({
  idList: vine.array(vine.number().withoutDecimals().min(1))
})
const deleteValidator = vine.compile(deleteSchema);
export async function deleteValidatorMiddleware(req, res, next) {
  const data = {
    idList: req.body.idList
  }
  try {
    req.val = await deleteValidator.validate(data);
    next();
  } catch(e) {
    console.error(e);
    res.sendStatus(500);
  }
}

const searchSchema = vine.object({
  value: vine.string()
})
const searchValidator = vine.compile(searchSchema);
export const searchValidatorMiddleware = async (req, res, next) => {
  const data = {
    value: req.body.search
  }
  try {
    req.val.search = await searchValidator.validate(data);
    next();
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}