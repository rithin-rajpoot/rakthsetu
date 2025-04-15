import userSchema from  "../utils/validationSchema.js";
import { errorHandler } from "../utils/errorHandler.js";
const validateUser = (userData)=>{
    const result = userSchema.validate(userData,{abortEarly:false});
    if(result.error)
    {
        const msg = result.error.details.map(el=>el.message).join(",");
        return next(new errorHandler(msg, 400))
    }
}

export default validateUser;