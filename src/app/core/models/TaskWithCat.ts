import { Task } from "./task";
export interface TaskWithCat extends Task {
  categoryName: string;
  categoryColor: string;
}