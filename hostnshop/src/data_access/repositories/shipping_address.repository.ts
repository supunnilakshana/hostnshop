/* eslint-disable @typescript-eslint/no-unused-vars */
import {prisma} from "../db_client/prisma_client";
import {
  CreateShippingAddressDTO,
  ReadShippingAddressDTO,
  UpdateShippingAddressDTO,
} from "@/shared/dtos";
import {IShippingAddressRepository} from "./ishipping_address.repository";
import {ShippingAddressMapper} from "../mappers/prisma";

export class ShippingAddressRepository implements IShippingAddressRepository {
  async create(
    data: CreateShippingAddressDTO
  ): Promise<ReadShippingAddressDTO> {
    // If this is set as default, unset any existing default addresses for this user
    if (data.is_default) {
      await prisma.shippingAddress.updateMany({
        where: {customer_id: data.customer_id, is_default: true},
        data: {is_default: false},
      });
    }

    const address = await prisma.shippingAddress.create({data});
    return ShippingAddressMapper.toReadDTO(address);
  }

  async update(
    id: string,
    data: UpdateShippingAddressDTO
  ): Promise<ReadShippingAddressDTO | null> {
    try {
      // Get the address to update
      const currentAddress = await prisma.shippingAddress.findUnique({
        where: {id},
      });

      if (!currentAddress) return null;

      // If setting as default, unset any existing default addresses for this user
      if (data.is_default && !currentAddress.is_default) {
        await prisma.shippingAddress.updateMany({
          where: {customer_id: currentAddress.customer_id, is_default: true},
          data: {is_default: false},
        });
      }

      const address = await prisma.shippingAddress.update({
        where: {id},
        data,
      });

      return ShippingAddressMapper.toReadDTO(address);
    } catch (error) {
      return null;
    }
  }

  async findOne(id: string): Promise<ReadShippingAddressDTO | null> {
    const address = await prisma.shippingAddress.findUnique({
      where: {id},
    });
    return address ? ShippingAddressMapper.toReadDTO(address) : null;
  }

  async findByUser(userId: string): Promise<ReadShippingAddressDTO[]> {
    const addresses = await prisma.shippingAddress.findMany({
      where: {customer_id: userId},
      orderBy: [{is_default: "desc"}],
    });

    return ShippingAddressMapper.toReadDTOList(addresses);
  }

  async setDefault(
    userId: string,
    addressId: string
  ): Promise<ReadShippingAddressDTO | null> {
    try {
      // First, unset all default addresses for this user
      await prisma.shippingAddress.updateMany({
        where: {customer_id: userId, is_default: true},
        data: {is_default: false},
      });

      // Then set the new default
      const address = await prisma.shippingAddress.update({
        where: {id: addressId},
        data: {is_default: true},
      });

      return ShippingAddressMapper.toReadDTO(address);
    } catch (error) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.shippingAddress.delete({
        where: {id},
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
