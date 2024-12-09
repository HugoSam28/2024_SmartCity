import vine from "@vinejs/vine";

const schema = vine.object({
  iPage: vine.number().withoutDecimals().min(1)
});

const validator = vine.compile(schema);

export const pageValidator = async (req, res, next) => {
  let data = {
    iPage: req.body.iPage,
  }
  try {
    req.val = await validator.validate(data);
    next();
  } catch (e) {
    console.error(e);
  }
}