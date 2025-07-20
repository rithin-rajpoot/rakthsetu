import Joi from "joi";
 const userSchema = Joi.object({
    fullName: Joi.string().min(1).max(20).required(),
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
    phone: Joi.string().pattern(/^[0-9+]{10,15}$/).required().messages({ //This allows 10 to 15 digits, including an optional + at the start.
        "string.pattern.base": "Phone number must be exactly 10 digits."
    }),
    password: Joi.string().min(6).max(10).required(),
    bloodType: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required(),
  location: Joi.object({
    type: Joi.string().valid('Point').default('Point'),
    coordinates: Joi.array()
      .items(Joi.number())
      .length(2)
      .required()
      .messages({
        'array.length': 'Coordinates must have exactly two values: [longitude, latitude]'
      })
  }).required(),
  createdAt: Joi.date().default(Date.now)
})

export default userSchema;