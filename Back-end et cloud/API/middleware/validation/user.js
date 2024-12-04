const schema = vine.object({
  id: vine.number(),
  firstName: vine.string().optional(),
  lastName: vine.string().optional(),
  email: vine.string().email().optionnal(),
  phoneNumber: vine.string.regex(/^\+[1-9][0-9]{7,14}$/),
  


})

export async function userValidatorMiddleware(req, res, next) {

}