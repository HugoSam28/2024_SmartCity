/**
 * @swagger
 * components:
 *  responses:
 *    mustBeAdmin:
 *      description: The action must be realized by an admin.
 */

export const admin = (req, res, next) => {
    if(req.session.role === "ROLE_ADMIN"){
        next();
    }
    else{
        res.sendStatus(403);
    }
};