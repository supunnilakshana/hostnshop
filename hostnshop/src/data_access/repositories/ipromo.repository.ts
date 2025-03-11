/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPromoCodeRepository {
  create(data: any): Promise<any>;
  update(id: string, data: any): Promise<any | null>;
  findOne(id: string): Promise<any | null>;
  findByCode(code: string): Promise<any | null>;
  findAll(includeInactive?: boolean): Promise<any[]>;
  findActive(): Promise<any[]>;
  delete(id: string): Promise<boolean>;
  recordUsage(
    promoCodeId: string,
    orderId: string,
    userId: string,
    discount: number
  ): Promise<void>;
  getUsageStats(promoCodeId: string): Promise<any>;
}
