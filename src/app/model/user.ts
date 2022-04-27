import {Role} from "./role";
import {SystemStock} from "./system-stock";

export class User {
  id: number;
  login: string;
  password: string;
  role: Role;
  systemStocks: SystemStock[];
}
