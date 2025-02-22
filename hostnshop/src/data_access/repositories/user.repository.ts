import {prisma} from "../db_client/prisma_client";
import {
  CreateUserDTO,
  DeleteUserDTO,
  ReadUserAuthDTO,
  ReadUserDTO,
  UpdateUserDTO,
} from "@/shared/dtos";
import {IUserRepository} from "./iuser.repository";
import {UserMapper} from "../mappers/prisma";

export class UserRepository implements IUserRepository {
  async create(data: CreateUserDTO): Promise<ReadUserDTO> {
    const user = await prisma.user.create({data});
    return UserMapper.toReadDTO(user);
  }

  async update(id: string, data: UpdateUserDTO): Promise<ReadUserDTO | null> {
    const user = await prisma.user.update({
      where: {id},
      data,
    });
    return user ? UserMapper.toReadDTO(user) : null;
  }

  async findOne(id: string): Promise<ReadUserDTO | null> {
    const user = await prisma.user.findUnique({
      where: {id},
    });
    return user ? UserMapper.toReadDTO(user) : null;
  }

  async findOneAuth(id: string): Promise<ReadUserAuthDTO | null> {
    const user = await prisma.user.findUnique({
      where: {id},
    });
    return user ? UserMapper.toReadAuthDTO(user) : null;
  }
  async findByEmail(email: string): Promise<ReadUserAuthDTO | null> {
    const user = await prisma.user.findUnique({
      where: {email},
    });
    return user ? UserMapper.toReadAuthDTO(user) : null;
  }
  async findAll(): Promise<ReadUserDTO[]> {
    const users = await prisma.user.findMany();
    return UserMapper.toReadDTOList(users);
  }

  async delete(data: DeleteUserDTO): Promise<boolean> {
    const user = await prisma.user.delete({
      where: {id: data.id},
    });
    return !!user;
  }
}
