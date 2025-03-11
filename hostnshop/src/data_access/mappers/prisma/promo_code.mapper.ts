// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {PromoCode} from "@prisma/client";

// export class PromoCodeMapper {
//   static toReadDTO(promoCode: PromoCode): any {
//     return {
//       id: promoCode.id,
//       code: promoCode.code,
//       discount_percentage: promoCode.discount_percentage,
//       expires_at: promoCode.expires_at
//         ? promoCode.expires_at.toISOString()
//         : null,
//       max_uses: promoCode.max_uses,
//       uses: promoCode.uses || 0,
//       is_active: promoCode.is_active,
//       min_order_value: promoCode.min_order_value,
//       created_at: promoCode.created_at.toISOString(),
//     };
//   }

//   static toReadDTOList(promoCodes: PromoCode[]): any[] {
//     return promoCodes.map((promoCode) => this.toReadDTO(promoCode));
//   }
// }
