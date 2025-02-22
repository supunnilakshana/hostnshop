import {User} from "@prisma/client"; // Assuming this is your Prisma User model
import {ReadUserAuthDTO, ReadUserDTO} from "@/shared/dtos";

export class UserMapper {
  static toReadDTO(user: User): ReadUserDTO {
    return {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      is_email_verified: user.is_email_verified,
      created_at: user.created_at.toISOString(),
    };
  }
  static toReadAuthDTO(user: User): ReadUserAuthDTO {
    return {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      password_hash: user.password_hash,
      is_email_verified: user.is_email_verified,
      created_at: user.created_at.toISOString(),
    };
  }

  static toReadDTOList(users: User[]): ReadUserDTO[] {
    return users.map((user) => this.toReadDTO(user));
  }
}
