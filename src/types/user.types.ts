export type User = {
  googleId?: string;
  name: string;
  givenName?: string;
  familyName?: string;
  email: string;
  password?: string;
  role?: string;
  profileImage?: string | null;
  createdAt?: Date;
  lastModifiedAt?: Date;
};