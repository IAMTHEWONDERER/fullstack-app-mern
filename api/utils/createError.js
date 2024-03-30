const createError = (status, message)=>{
    const err = new Error();
    err.status = status;
    err.message = 'USER not found ';
    return err;
};
export default createError;