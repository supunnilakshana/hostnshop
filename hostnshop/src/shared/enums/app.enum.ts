export enum OrderStatus {
  PENDING = "Pending",
  PROCESSING = "Processing",
  SHIPPED = "Shipped",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled",
}

// Payment methods
export enum PaymentMethod {
  CREDIT_CARD = "CreditCard",
  PAYPAL = "PayPal",
  BANK_TRANSFER = "BankTransfer",
}

// Payment statuses
export enum PaymentStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
  FAILED = "Failed",
  REFUNDED = "Refunded",
}

// Notification types
export enum NotificationType {
  EMAIL = "Email",
  PUSH = "Push",
  SMS = "SMS",
}

// Promo code types
export enum PromoCodeType {
  PERCENTAGE = "Percentage",
  FIXED_AMOUNT = "FixedAmount",
  FREE_SHIPPING = "FreeShipping",
  BUY_ONE_GET_ONE = "BuyOneGetOne",
}

// Promo code applicability
export enum PromoCodeApplicability {
  ALL_PRODUCTS = "AllProducts",
  SPECIFIC_PRODUCTS = "SpecificProducts",
  SPECIFIC_CATEGORIES = "SpecificCategories",
}

// Promo code status
export enum PromoCodeStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  EXPIRED = "Expired",
  USAGE_LIMIT_REACHED = "UsageLimitReached",
}

// Review status (for moderation)
export enum ReviewStatus {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
  HIDDEN = "Hidden",
}

// Shipping methods
export enum ShippingMethod {
  STANDARD = "Standard",
  EXPRESS = "Express",
  OVERNIGHT = "Overnight",
  PICKUP = "Pickup",
}

// Marketing campaign types
export enum CampaignType {
  PROMOTIONAL = "Promotional",
  NEWSLETTER = "Newsletter",
  ABANDONED_CART = "AbandonedCart",
  PRODUCT_ANNOUNCEMENT = "ProductAnnouncement",
  WELCOME = "Welcome",
}

// User account status
export enum UserStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  BANNED = "Banned",
  PENDING_VERIFICATION = "PendingVerification",
}

// Inventory status
export enum InventoryStatus {
  IN_STOCK = "InStock",
  LOW_STOCK = "LowStock",
  OUT_OF_STOCK = "OutOfStock",
  DISCONTINUED = "Discontinued",
}

// Sort order
export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}
