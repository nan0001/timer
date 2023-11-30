import { Request } from 'express';
import { User } from './users.entity';

export interface UserRequestInterface extends Request {
  user: User;
}
