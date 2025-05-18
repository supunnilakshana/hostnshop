/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {prisma} from "../db_client/prisma_client";
import {CreateReviewDTO, ReadReviewDTO, UpdateReviewDTO} from "@/shared/dtos";
import {IReviewRepository} from "./ireview.repository";
import {ReviewMapper} from "../mappers/prisma";

export class ReviewRepository implements IReviewRepository {
  async create(data: CreateReviewDTO): Promise<ReadReviewDTO> {
    const review = await prisma.review.create({data});
    return ReviewMapper.toReadDTO(review);
  }

  async update(
    id: string,
    data: UpdateReviewDTO
  ): Promise<ReadReviewDTO | null> {
    try {
      const review = await prisma.review.update({
        where: {id},
        data,
      });
      return ReviewMapper.toReadDTO(review);
    } catch (error) {
      return null;
    }
  }

  async findOne(id: string): Promise<ReadReviewDTO | null> {
    const review = await prisma.review.findUnique({
      where: {id},
    });
    return review ? ReviewMapper.toReadDTO(review) : null;
  }

  async findByProduct(
    productId: string,
    options?: {
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: string;
    }
  ): Promise<{
    reviews: ReadReviewDTO[];
    total: number;
  }> {
    // Build where clause
    const where = {product_id: productId};

    // Count total
    const total = await prisma.review.count({where});

    // Default sort options
    const sortBy = options?.sortBy || "created_at";
    const sortOrder = options?.sortOrder || "desc";

    // Build orderBy object
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Get reviews with pagination
    const skip =
      options?.page && options?.limit
        ? (options.page - 1) * options.limit
        : undefined;
    const take = options?.limit;

    const reviews = await prisma.review.findMany({
      where,
      skip,
      take,
      orderBy,
      include: {
        customer: {
          select: {
            name: true,
          },
        },
        product: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      reviews: reviews.map((review) => ReviewMapper.toReadDetailedDTO(review)),
      total,
    };
  }

  async findByUser(
    userId: string,
    options?: {
      page?: number;
      limit?: number;
    }
  ): Promise<{
    reviews: ReadReviewDTO[];
    total: number;
  }> {
    // Build where clause
    const where = {customer_id: userId};

    // Count total
    const total = await prisma.review.count({where});

    // Get reviews with pagination
    const skip =
      options?.page && options?.limit
        ? (options.page - 1) * options.limit
        : undefined;
    const take = options?.limit;

    const reviews = await prisma.review.findMany({
      where,
      skip,
      take,
      orderBy: {created_at: "desc"},
      include: {
        product: {
          select: {
            name: true,
            image_url: true,
          },
        },
      },
    });

    return {
      reviews: reviews.map((review) => ReviewMapper.toReadDetailedDTO(review)),
      total,
    };
  }

  async findForModeration(options?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<{
    reviews: any[];
    total: number;
  }> {
    // In a real application, you would have a status field for moderation
    // For this implementation, we'll return all reviews
    const where: any = {};

    if (options?.status) {
      where.status = options.status;
    }

    // Count total
    const total = await prisma.review.count({where});

    // Get reviews with pagination
    const skip =
      options?.page && options?.limit
        ? (options.page - 1) * options.limit
        : undefined;
    const take = options?.limit;

    const reviews = await prisma.review.findMany({
      where,
      skip,
      take,
      orderBy: {created_at: "desc"},
      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
        product: {
          select: {
            name: true,
            image_url: true,
          },
        },
      },
    });

    return {
      reviews: reviews.map((review) => ReviewMapper.toReadDetailedDTO(review)),
      total,
    };
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.review.delete({
        where: {id},
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
