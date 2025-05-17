import {
  CreateUserDTO,
  DeleteUserDTO,
  ReadUserDTO,
  UpdateUserDTO,
} from "@/shared/dtos";

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<ReadUserDTO>;
  update(id: string, data: UpdateUserDTO): Promise<ReadUserDTO | null>;

  findOne(id: string): Promise<ReadUserDTO | null>;
  findByEmail(id: string): Promise<ReadUserDTO | null>;
  findByRole(role: string): Promise<ReadUserDTO[]>;
  findAll(): Promise<ReadUserDTO[]>;
  delete(data: DeleteUserDTO): Promise<boolean>;
}
