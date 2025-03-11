import {ShippingAddress} from "@prisma/client";
import {ReadShippingAddressDTO} from "@/shared/dtos";

export class ShippingAddressMapper {
  static toReadDTO(address: ShippingAddress): ReadShippingAddressDTO {
    return {
      id: address.id,
      customer_id: address.customer_id,
      address: address.address,
      city: address.city,
      postal_code: address.postal_code,
      country: address.country,
      is_default: address.is_default,
    };
  }

  static toReadDTOList(addresses: ShippingAddress[]): ReadShippingAddressDTO[] {
    return addresses.map((address) => this.toReadDTO(address));
  }
}
