/* eslint-disable @typescript-eslint/no-unused-vars */
import {CreateUserDTO, UpdateUserDTO} from "@/shared/dtos";
import {IRepository} from "./repository.interface";
import {PrismaClient, User} from "@prisma/client"; // Import Prisma client and User model

const prisma = new PrismaClient();

export class UserRepository implements IRepository {
  // Create a new user
  async create<ReadUserDTO, CreateUserDTO>(
    data: CreateUserDTO
  ): Promise<ReadUserDTO> {
    const userData = data as UserDTO;
    const user = await prisma.user.create({
      data: {
        role: userData.role,
        name: userData.name,
        email: userData.email,
        password_hash: userData.password_hash,
        phone_number: userData.phone_number,
        address: userData.address,
      },
    });

    const readuser: ReadUserDTO = user as R;

    return user as unknown as ReadUserDTO;
  }

  // Update an existing user by id
  async update(id: string, data: UpdateUserDTO): Promise<User | null> {
    return prisma.user.update({
      where: {id},
      data,
    });
  }

  // Find a user by id
  async findOne(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {id},
    });
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  // Delete a user by id
  async delete(id: string): Promise<boolean> {
    try {
      await prisma.user.delete({
        where: {id},
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
