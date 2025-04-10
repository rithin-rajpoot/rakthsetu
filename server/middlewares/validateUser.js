import userSchema from  "../utils/validationSchema.js";
import ExpressError from "../utils/ExpressError.js";
const validateUser = (userData)=>{
    const result = userSchema.validate(userData,{abortEarly:false});
    if(result.error)
    {
        const msg = result.error.details.map(el=>el.message).join(",");
        throw new ExpressError(400,msg);
    }
}

export default validateUser;