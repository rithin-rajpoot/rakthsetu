import userSchema from  "../utils/validationSchema.util.js";
import { errorHandler } from "../utils/errorHandler.util.js";
const validateUser = (userData)=>{
    const result = userSchema.validate(userData,{abortEarly:false});
    if(result.error)
    {
        const msg = result.error.details.map(el=>el.message).join(",");
        throw new errorHandler(msg, 400)
    }
}

export default validateUser;