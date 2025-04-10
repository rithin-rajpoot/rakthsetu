const errorMiddleWare = (err,req,res,next)=>{
    let {status=500,errMessage="Something went wrong"} = err;
    res.status(status).json({success:false, errMessage});
}
export default errorMiddleWare;