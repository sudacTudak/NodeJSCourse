import { Request, Response, NextFunction, Router } from 'express';
import { IMiddleWare } from './middleware.interface';

export interface IControllerRoute {
  path: string;
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
  func: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: IMiddleWare[];
}

export type IExpressReturn = Response<any, Record<string, any>>;
