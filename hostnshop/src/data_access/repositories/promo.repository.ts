// import {prisma} from "../db_client/prisma_client";
// import {IPromoCodeRepository} from "./ipromo-code.repository";
// import {PromoCodeMapper} from "../mappers/prisma";

// export class PromoCodeRepository implements IPromoCodeRepository {
//   async create(data: any): Promise<any> {
//     const promoCode = await prisma.$transaction(async (tx) => {
//       // Create promo code
//       const newPromoCode = await tx.promoCode.create({
//         data: {
//           code: data.code,
//           discount_percentage: data.discount_percentage,
//           expires_at: data.expires_at ? new Date(data.expires_at) : null,
//           max_uses: data.max_uses || null,
//           is_active: data.is_active !== undefined ? data.is_active : true,
//           min_order_value: data.min_order_value || null,
//         },
//       });

//       // Create product or category restrictions if provided
//       if (data.applicable_products && data.applicable_products.length > 0) {
//         // In a real schema, you would have junction tables for these relationships
//         // For this implementation, we'll assume this is handled differently
//       }

//       return newPromoCode;
//     });

//     return PromoCodeMapper.toReadDTO(promoCode);
//   }

//   async update(id: string, data: any): Promise<any | null> {
//     try {
//       const promoCode = await prisma.promoCode.update({
//         where: {id},
//         data: {
//           code: data.code,
//           discount_percentage: data.discount_percentage,
//           expires_at: data.expires_at ? new Date(data.expires_at) : undefined,
//           max_uses: data.max_uses,
//           is_active: data.is_active,
//           min_order_value: data.min_order_value,
//         },
//       });

//       // Update product or category restrictions if provided
//       // In a real schema, you would update junction tables for these relationships

//       return PromoCodeMapper.toReadDTO(promoCode);
//     } catch (error) {
//       return null;
//     }
//   }

//   async findOne(id: string): Promise<any | null> {
//     // In a real schema, you would include product and category restrictions
//     const promoCode = await prisma.promoCode.findUnique({
//       where: {id},
//     });

//     return promoCode ? PromoCodeMapper.toReadDTO(promoCode) : null;
//   }

//   async findByCode(code: string): Promise<any | null> {
//     // In a real schema, you would include product and category restrictions
//     const promoCode = await prisma.promoCode.findFirst({
//       where: {code, is_active: true},
//     });

//     return promoCode ? PromoCodeMapper.toReadDTO(promoCode) : null;
//   }

//   async findAll(includeInactive: boolean = false): Promise<any[]> {
//     const where = includeInactive ? {} : {is_active: true};

//     const promoCodes = await prisma.promoCode.findMany({
//       where,
//       orderBy: {created_at: "desc"},
//     });

//     return PromoCodeMapper.toReadDTOList(promoCodes);
//   }

//   async findActive(): Promise<any[]> {
//     const now = new Date();

//     const promoCodes = await prisma.promoCode.findMany({
//       where: {
//         is_active: true,
//         OR: [{expires_at: null}, {expires_at: {gt: now}}],
//       },
//       orderBy: {created_at: "desc"},
//     });

//     return PromoCodeMapper.toReadDTOList(promoCodes);
//   }

//   async delete(id: string): Promise<boolean> {
//     try {
//       await prisma.promoCode.delete({
//         where: {id},
//       });
//       return true;
//     } catch (error) {
//       return false;
//     }
//   }

//   async recordUsage(
//     promoCodeId: string,
//     orderId: string,
//     userId: string,
//     discount: number
//   ): Promise<void> {
//     // In a real schema, you would have a PromoCodeUsage table
//     // For this implementation, we'll just increment usage count
//     await prisma.promoCode.update({
//       where: {id: promoCodeId},
//       data: {
//         uses: {
//           increment: 1,
//         },
//       },
//     });
//   }

//   async getUsageStats(promoCodeId: string): Promise<any> {
//     // In a real schema, you would query the PromoCodeUsage table
//     // For this implementation, we'll return basic stats
//     const promoCode = await prisma.promoCode.findUnique({
//       where: {id: promoCodeId},
//     });

//     if (!promoCode) return null;

//     return {
//       id: promoCode.id,
//       code: promoCode.code,
//       total_uses: promoCode.uses || 0,
//       max_uses: promoCode.max_uses,
//       is_active: promoCode.is_active,
//       // In a real implementation, you would include more detailed stats:
//       // total_discount_amount, average_order_value, etc.
//     };
//   }
// }
