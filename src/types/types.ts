export type Department = "кардиологическое" | "хирургическое";

export interface Nurse {
  id: number;
  fullName: string;
  department: Department;
}

export interface Doctor extends Nurse {
  isHead: boolean;
}
