export interface UserApi {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  accessToken?: string;
}
