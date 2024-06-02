import prisma from "@/app/db/provide-prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(params);
  try {
    const meal = await prisma.meal.findUnique({
      where: { id: params.id },
    });

    if (!meal) {
      return NextResponse.json({ error: "Meal not found!" }, { status: 404 });
    }
    await prisma.meal.delete({
      where: { id: params.id },
    });
    return NextResponse.json({message: "Successfully deleted!"}, { status: 200 });
  } catch (error) {
    console.error("Error deleting meal:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const mealId = params.id;
      const mealData = await request.json();
  
      const updatedMeal = await prisma.meal.update({
        where: { id: mealId },
        data: mealData,
      });
  
      return NextResponse.json(updatedMeal);
    } catch (error) {
      console.error("Error updating meal:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
