
import prisma from "@/app/db/provide-prisma";
import { MealType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const meal = await prisma.meal.create({
      data: {
        mealType: body.mealType as MealType,
        description: body.description,
        poopType: body.poopType,
        quantity: body.quantity,
        when: body.when,
      },
    });

    return new NextResponse(JSON.stringify(meal), { status: 201 });
  } catch (error) {
    console.error("Error creating meal:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const meals = await prisma.meal.findMany();
    return new NextResponse(JSON.stringify(meals), { status: 200 });
  } catch (error) {
    console.error("Error fetching meals:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
