export const checkAdmin = async function(req, res, next) {
    try {
        const user = req.user;
        if (!user.admin) {
            return res.status(403).json({ success:false, message:"Vous n'etes pas un admin" })
        } else {
            next();
        }
    } catch (error) {
        serverLogger.error(`Èrreur:${error.message} dans ${error.message}`);
        return res.status(500).json({ success:false, message:error.message });
    }
}