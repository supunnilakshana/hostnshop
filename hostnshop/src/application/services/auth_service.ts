// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */

// import {UserRepository} from "@/data_access/repositories/user.repository";
// import {HttpStatus} from "@/shared/enums";
// import {
//   AuthResponse,
//   HttpError,
//   SignInRequest,
//   SignUpRequest,
//   TokenResponse,
// } from "@/shared/types";
// import {JWTUtil} from "@/shared/utils/jwt_util";

// import bcrypt from "bcrypt";

// export class AuthService {
//   private userRepository: UserRepository;

//   constructor() {
//     this.userRepository = new UserRepository();
//   }

//   /**
//    * Sign up a new user
//    */
//   async signUp(data: SignUpRequest): Promise<AuthResponse> {
//     try {
//       // Check if email exists
//       const existingUser = await this.userRepository.findOne(data.email);
//       if (existingUser) {
//         throw new HttpError(
//           HttpStatus.BAD_REQUEST,
//           "Email already registered",
//           "EMAIL_EXISTS"
//         );
//       }

//       // Hash password
//       const hashedPassword = await bcrypt.hash(data.password, 10);

//       // Create user with default role
//       const user = await this.userRepository.create({
//         password_hash: hashedPassword,
//         role: "Customer",
//         name: `${data.firstName} ${data.lastName}`,
//         email: data.email,
//         phone_number: "",
//       });

//       // Generate tokens
//       const tokens = await this.generateTokens(user);

//       return {
//         user: this.sanitizeUser(user),
//         ...tokens,
//       };
//     } catch (error) {
//       if (error instanceof HttpError) throw error;
//       throw new HttpError(
//         HttpStatus.INTERNAL_SERVER_ERROR,
//         "Error creating user account",
//         "SIGNUP_ERROR"
//       );
//     }
//   }

//   /**
//    * Sign in existing user
//    */
//   async signIn(credentials: SignInRequest): Promise<AuthResponse> {
//     try {
//       // Find user
//       const user = await this.userRepository.findByEmail(credentials.email);
//       if (!user) {
//         throw new HttpError(
//           HttpStatus.UNAUTHORIZED,
//           "Invalid credentials",
//           "INVALID_CREDENTIALS"
//         );
//       }

//       // Verify password
//       const isValidPassword = await bcrypt.compare(
//         credentials.password,
//         user.password_hash!
//       );
//       if (!isValidPassword) {
//         throw new HttpError(
//           HttpStatus.UNAUTHORIZED,
//           "Invalid credentials",
//           "INVALID_CREDENTIALS"
//         );
//       }

//       // Generate tokens
//       const tokens = await this.generateTokens(user);

//       return {
//         user: this.sanitizeUser(user),
//         ...tokens,
//       };
//     } catch (error) {
//       if (error instanceof HttpError) throw error;
//       throw new HttpError(
//         HttpStatus.INTERNAL_SERVER_ERROR,
//         "Error during sign in",
//         "SIGNIN_ERROR"
//       );
//     }
//   }

//   /**
//    * Refresh access token using refresh token
//    */
//   async refreshTokens(refreshToken: string): Promise<TokenResponse> {
//     try {
//       // Verify refresh token
//       const payload = JWTUtil.verifyRefreshToken(refreshToken);

//       // Find user
//       const user = await this.userRepository.findOne(payload.id);
//       if (!user) {
//         throw new HttpError(
//           HttpStatus.UNAUTHORIZED,
//           "Invalid refresh token",
//           "INVALID_TOKEN"
//         );
//       }

//       // Generate new tokens
//       return await this.generateTokens(user);
//     } catch (error) {
//       if (error instanceof HttpError) throw error;
//       throw new HttpError(
//         HttpStatus.UNAUTHORIZED,
//         "Error refreshing token",
//         "REFRESH_ERROR"
//       );
//     }
//   }

//   /**
//    * Validate access token
//    */
//   async validateToken(accessToken: string): Promise<boolean> {
//     try {
//       const payload = JWTUtil.verifyAccessToken(accessToken);
//       const user = await this.userRepository.findOne(payload.id);
//       return !!user;
//     } catch {
//       return false;
//     }
//   }

//   /**
//    * Get user by token
//    */
//   async getUserFromToken(
//     accessToken: string
//   ): Promise<AuthResponse["user"] | null> {
//     try {
//       const payload = JWTUtil.verifyAccessToken(accessToken);
//       const user = await this.userRepository.findOne(payload.id);
//       return user ? this.sanitizeUser(user) : null;
//     } catch {
//       return null;
//     }
//   }

//   /**
//    * Change user password
//    */
//   async changePassword(
//     userId: string,
//     oldPassword: string,
//     newPassword: string
//   ): Promise<void> {
//     try {
//       const user = await this.userRepository.findOne(userId);
//       if (!user) {
//         throw new HttpError(
//           HttpStatus.NOT_FOUND,
//           "User not found",
//           "USER_NOT_FOUND"
//         );
//       }

//       // Verify old password
//       const isValidPassword = await bcrypt.compare(
//         oldPassword,
//         user.password_hash!
//       );
//       if (!isValidPassword) {
//         throw new HttpError(
//           HttpStatus.UNAUTHORIZED,
//           "Current password is incorrect",
//           "INVALID_PASSWORD"
//         );
//       }

//       // Hash new password
//       const hashedPassword = await bcrypt.hash(newPassword, 10);

//       // Update password
//       await this.userRepository.update(userId, {password_hash: hashedPassword});
//     } catch (error) {
//       if (error instanceof HttpError) throw error;
//       throw new HttpError(
//         HttpStatus.INTERNAL_SERVER_ERROR,
//         "Error changing password",
//         "PASSWORD_CHANGE_ERROR"
//       );
//     }
//   }

//   /**
//    * Reset user password (for forgot password flow)
//    */
//   async resetPassword(email: string): Promise<void> {
//     try {
//       const user = await this.userRepository.findByEmail(email);
//       if (!user) {
//         // Return success even if user not found for security
//         return;
//       }

//       // Generate temporary password or reset token
//       const tempPassword = Math.random().toString(36).slice(-8);
//       const hashedPassword = await bcrypt.hash(tempPassword, 10);

//       // Update user password
//       await this.userRepository.update(user.id, {
//         password_hash: hashedPassword,
//       });

//       // Send email with temporary password
//       // await this.emailService.sendPasswordReset(email, tempPassword);
//     } catch (error) {
//       throw new HttpError(
//         HttpStatus.INTERNAL_SERVER_ERROR,
//         "Error resetting password",
//         "PASSWORD_RESET_ERROR"
//       );
//     }
//   }

//   /**
//    * Generate access and refresh tokens
//    */
//   private async generateTokens(user: any): Promise<TokenResponse> {
//     const payload = {
//       id: user.id,
//       email: user.email,
//       role: user.role,
//     };

//     return {
//       accessToken: JWTUtil.generateAccessToken(payload),
//       refreshToken: JWTUtil.generateRefreshToken(payload),
//     };
//   }

//   /**
//    * Remove sensitive data from user object
//    */
//   private sanitizeUser(user: any): AuthResponse["user"] {
//     const {password, ...sanitizedUser} = user;
//     return sanitizedUser;
//   }
// }
