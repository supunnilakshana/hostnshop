/* eslint-disable @typescript-eslint/no-unused-vars */
// src/application/services/user.service.ts
import {HttpStatus, UserRole} from "@/shared/enums";
import {HttpError} from "@/shared/types";
import {ReadUserDTO, UpdateUserDTO} from "@/shared/dtos";
import {UserRepository} from "@/data_access/repositories/user.repository";
import {IUserRepository} from "@/data_access/repositories/iuser.repository";
import {EmailSubscriptionRepository} from "@/data_access/repositories/email_sub.repository";

export class UserService {
  private userRepository: IUserRepository;
  private emailSubscriptionRepository: EmailSubscriptionRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.emailSubscriptionRepository = new EmailSubscriptionRepository();
  }

  async getAllUsers(): Promise<ReadUserDTO[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch users",
        "USERS_FETCH_ERROR"
      );
    }
  }

  async getCustomers(): Promise<ReadUserDTO[]> {
    try {
      return await this.userRepository.findByRole(UserRole.CUSTOMER.toString());
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch customers",
        "CUSTOMERS_FETCH_ERROR"
      );
    }
  }

  async getAdmins(): Promise<ReadUserDTO[]> {
    try {
      return await this.userRepository.findByRole(UserRole.ADMIN.toString());
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch admins",
        "ADMINS_FETCH_ERROR"
      );
    }
  }

  async getUserById(id: string): Promise<ReadUserDTO> {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "User not found",
          "USER_NOT_FOUND"
        );
      }
      return user;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to fetch user",
        "USER_FETCH_ERROR"
      );
    }
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<ReadUserDTO> {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "User not found",
          "USER_NOT_FOUND"
        );
      }

      // If email is being updated, check if it's already in use
      if (data.email && data.email !== user.email) {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
          throw new HttpError(
            HttpStatus.BAD_REQUEST,
            "Email already in use",
            "EMAIL_IN_USE"
          );
        }
      }

      const updatedUser = await this.userRepository.update(id, data);
      if (!updatedUser) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to update user",
          "USER_UPDATE_ERROR"
        );
      }

      return updatedUser;
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update user",
        "USER_UPDATE_ERROR"
      );
    }
  }

  async deleteUser(id: string): Promise<{success: boolean}> {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) {
        throw new HttpError(
          HttpStatus.NOT_FOUND,
          "User not found",
          "USER_NOT_FOUND"
        );
      }

      const success = await this.userRepository.delete({id});
      if (!success) {
        throw new HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Failed to delete user",
          "USER_DELETE_ERROR"
        );
      }

      return {success};
    } catch (error) {
      if (error instanceof HttpError) throw error;

      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to delete user",
        "USER_DELETE_ERROR"
      );
    }
  }

  async getUserSubscriptionStatus(userId: string): Promise<boolean> {
    try {
      const subscription = await this.emailSubscriptionRepository.findByUser(
        userId
      );
      return subscription ? subscription.is_subscribed : false;
    } catch (error) {
      // If error, assume not subscribed
      return false;
    }
  }

  async updateUserSubscription(
    userId: string,
    isSubscribed: boolean
  ): Promise<boolean> {
    try {
      const subscription = await this.emailSubscriptionRepository.findByUser(
        userId
      );

      if (subscription) {
        await this.emailSubscriptionRepository.update(subscription.id, {
          is_subscribed: isSubscribed,
        });
      } else {
        await this.emailSubscriptionRepository.create({
          customer_id: userId,
          is_subscribed: isSubscribed,
        });
      }

      return true;
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update subscription status",
        "SUBSCRIPTION_UPDATE_ERROR"
      );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getUserStatistics(): Promise<any> {
    try {
      const allUsers = await this.userRepository.findAll();
      const customers = allUsers.filter((u) => u.role === UserRole.CUSTOMER);
      const admins = allUsers.filter((u) => u.role === UserRole.ADMIN);

      // Calculate new users in the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const newUsers = customers.filter(
        (u) => new Date(u.created_at) > thirtyDaysAgo
      ).length;

      // Get verified vs unverified users
      const verifiedUsers = customers.filter((u) => u.is_email_verified).length;
      const unverifiedUsers = customers.length - verifiedUsers;

      return {
        totalUsers: allUsers.length,
        totalCustomers: customers.length,
        totalAdmins: admins.length,
        newUsersLast30Days: newUsers,
        verifiedUsers,
        unverifiedUsers,
        verificationRate:
          customers.length > 0
            ? Math.round((verifiedUsers / customers.length) * 100)
            : 0,
      };
    } catch (error) {
      throw new HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Failed to get user statistics",
        "USER_STATS_ERROR"
      );
    }
  }
}
