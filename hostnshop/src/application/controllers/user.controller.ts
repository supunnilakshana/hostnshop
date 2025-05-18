// src/application/controllers/user.controller.ts
import {NextRequest} from "next/server";
import {BaseController} from "./base.controller";
import {HttpStatus, UserRole} from "@/shared/enums";
import {UserService} from "../services/user.service";
import {UpdateUserDTO} from "@/shared/dtos";

export class UserController extends BaseController {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  async getAllUsers(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const users = await this.userService.getAllUsers();
        return users;
      },
      [UserRole.ADMIN]
    );
  }

  async getCustomers(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const customers = await this.userService.getCustomers();
        return customers;
      },
      [UserRole.ADMIN]
    );
  }

  async getUserById(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "User ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        const user = await this.userService.getUserById(id);
        return user;
      },
      [UserRole.ADMIN]
    );
  }

  async updateUser(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "User ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        const userData = await this.getRequestBody<UpdateUserDTO>(req);
        const updatedUser = await this.userService.updateUser(id, userData);
        return updatedUser;
      },
      [UserRole.ADMIN]
    );
  }

  async deleteUser(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const id = req.nextUrl.pathname.split("/").pop();
        if (!id) {
          return this.sendError({
            message: "User ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        const result = await this.userService.deleteUser(id);
        return result;
      },
      [UserRole.ADMIN]
    );
  }

  async getUserStatistics(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const statistics = await this.userService.getUserStatistics();
        return statistics;
      },
      [UserRole.ADMIN]
    );
  }

  async getUserSubscriptionStatus(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const userId = req.nextUrl.pathname.split("/").pop();
        if (!userId) {
          return this.sendError({
            message: "User ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        const isSubscribed = await this.userService.getUserSubscriptionStatus(
          userId
        );
        return {isSubscribed};
      },
      [UserRole.ADMIN]
    );
  }

  async updateUserSubscription(req: NextRequest) {
    return this.handleRequest(
      req,
      async () => {
        const userId = req.nextUrl.pathname.split("/").pop();
        if (!userId) {
          return this.sendError({
            message: "User ID is required",
            statusCode: HttpStatus.BAD_REQUEST,
          });
        }

        const {isSubscribed} = await this.getRequestBody<{
          isSubscribed: boolean;
        }>(req);
        const success = await this.userService.updateUserSubscription(
          userId,
          isSubscribed
        );
        return {success};
      },
      [UserRole.ADMIN]
    );
  }
}
