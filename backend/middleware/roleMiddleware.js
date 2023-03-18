import { ADMIN, USER } from "../constants";

const ROLES = {
  User: USER,
  Admin: ADMIN,
};

const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.user && !req?.roles) {
      res
        .status(401)
        .json({ message: "You are not authorized to perform this action." });

      throw new Error("You are not authorized to perform this action.");
    }

    const rolesArray = [...allowedRoles];

    const roleFound = req.roles
      .map((role) => rolesArray.includes(role))
      .find((value) => value === true);

    if (!roleFound) {
      res
        .status(401)
        .json({ message: "You are not authorized to perform this action." });

      throw new Error("You are not authorized to perform this action.");
    }

    next();
  };
};

const role = { ROLES, checkRole };

export default role;
