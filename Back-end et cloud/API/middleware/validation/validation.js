import vine from "@vine/vine"
import { validator } from "@vinejs/vine/factories";

const schema = vine.object({
  iPage: vine.number().withoutDecimals().min(1)
});

const validator = vine.compile(validator, schema);

export const pageValidator = (req, res, {iPage}) => {
  let data = {
    iPage: iPage
  }
  req.val = validator.validate(data);
  next();
}