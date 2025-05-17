/* eslint-disable @typescript-eslint/no-explicit-any */

import {AuthService} from "../services/auth.service";
import {CategoryService} from "../services/category.service";
import {ProductService} from "../services/product.service";

/**
 * Service Locator pattern implementation
 * This class provides a centralized location for getting service instances
 * and ensures we don't create multiple instances of the same service unnecessarily
 */

export class ServiceLocator {
  private static instance: ServiceLocator;
  private services: Map<string, any> = new Map();

  private constructor() {
    // Private constructor to enforce singleton pattern
  }

  public static getInstance(): ServiceLocator {
    if (!ServiceLocator.instance) {
      ServiceLocator.instance = new ServiceLocator();
    }
    return ServiceLocator.instance;
  }

  // Get a service instance, creating it if it doesn't exist
  public getService<T>(serviceClass: new (...args: any[]) => T): T {
    const serviceName = serviceClass.name;

    if (!this.services.has(serviceName)) {
      this.services.set(serviceName, new serviceClass());
    }

    return this.services.get(serviceName);
  }

  // Service-specific getters for convenience and type safety
  public getAuthService(): AuthService {
    return this.getService(AuthService);
  }

  public getCategoryService(): CategoryService {
    return this.getService(CategoryService);
  }

  public getProductService(): ProductService {
    return this.getService(ProductService);
  }

  //   public getOrderService(): OrderService {
  //     return this.getService(OrderService);
  //   }

  //   public getPaymentService(): PaymentService {
  //     return this.getService(PaymentService);
  //   }

  //   public getNotificationService(): NotificationService {
  //     return this.getService(NotificationService);
  //   }

  //   public getUserManagementService(): UserManagementService {
  //     return this.getService(UserManagementService);
  //   }

  //   public getUserProfileService(): UserProfileService {
  //     return this.getService(UserProfileService);
  //   }

  //   public getEmailSubscriptionService(): EmailSubscriptionService {
  //     return this.getService(EmailSubscriptionService);
  //   }

  //   public getReviewService(): ReviewService {
  //     return this.getService(ReviewService);
  //   }

  //   public getShippingAddressService(): ShippingAddressService {
  //     return this.getService(ShippingAddressService);
  //   }

  //   public getPromoCodeService(): PromoCodeService {
  //     return this.getService(PromoCodeService);
  //   }
}
