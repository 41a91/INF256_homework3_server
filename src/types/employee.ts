import { type TitleModel } from "./title.js";

export interface EmployeeWithTitles {
  id: number;
  name: string;
  titles: TitleModel[];
}
