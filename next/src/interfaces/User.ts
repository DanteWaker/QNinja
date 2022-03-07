export interface User {
  id: number;
  groups: string[];
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
  cpf: string;
  dateOfBirth: string;
  dateJoined: string;
  isActive: boolean;
  isAdmin: boolean;
  isSuperuser: boolean;
  lastLogin: string;
}
