import { NextFunction, Request, Response } from 'express';

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const method = req.method;
  const url = req.url;
  const date = new Date().toLocaleString();

  console.log(
    `Estás ejecutando un método ${method} en la ruta ${url}. Día y hora: ${date}`,
  );
  next();
}
