import {SystemStock} from "./system-stock";

export class News {
  id: number;
  systemStocks: SystemStock;
  source: string;
  title: string;
  description: string;
  active: boolean;
  fromApi: boolean;
  url: boolean;
}
