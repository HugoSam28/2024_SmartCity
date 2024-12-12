export const admin = (req, res, next) => {
    if(req.session.role === "ROLE_ADMIN"){
        next();
    }
    else{
        res.sendStatus(403);
    }
};