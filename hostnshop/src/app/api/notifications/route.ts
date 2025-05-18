/* eslint-disable @typescript-eslint/no-unused-vars */
// import {CategoryController} from "@/application/controllers/category.controller";

import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
  // Return an empty array as JSON response
  return NextResponse.json([]);
}
