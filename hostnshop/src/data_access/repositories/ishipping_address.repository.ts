import {
  CreateShippingAddressDTO,
  ReadShippingAddressDTO,
  UpdateShippingAddressDTO,
} from "@/shared/dtos";

export interface IShippingAddressRepository {
  create(data: CreateShippingAddressDTO): Promise<ReadShippingAddressDTO>;
  update(
    id: string,
    data: UpdateShippingAddressDTO
  ): Promise<ReadShippingAddressDTO | null>;
  findOne(id: string): Promise<ReadShippingAddressDTO | null>;
  findByUser(userId: string): Promise<ReadShippingAddressDTO[]>;
  setDefault(
    userId: string,
    addressId: string
  ): Promise<ReadShippingAddressDTO | null>;
  delete(id: string): Promise<boolean>;
}
