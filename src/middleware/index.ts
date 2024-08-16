import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// cspell: ignore  Ipunts
export const handleIpuntsError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validación
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
