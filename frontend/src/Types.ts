export interface StateDetailsType {
  _id?: string;
  stateName?: string;
  city?: string[];
}

export interface SubjectDetailsType {
  _id?: string;
  subjectName?: string;
  date?: string[];
  time?: string[];
  dateAndTime?: string[];
}

export interface RegistrationType {
  _id?: string;
  name?: string;
  email?: string;
  subject?: string;
  dateAndTime?: string;
  state?: string;
  city?: string;
  status?: string;
}
