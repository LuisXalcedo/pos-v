"use server";

import { salespersonSchema } from "@/lib/schema";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export async function createSalespersonAction(
  formData: FormData
): Promise<void> {
  try {
    //Convert FormData to object
    const rawData = Object.fromEntries(formData.entries());

    //Log the raw data for debugging
    console.log("Raw data:", rawData);

    //Parse and validate the data
    const validatedData = salespersonSchema.parse({
      ...rawData,
      id_employee: rawData.id_employee ? Number(rawData.id_employee) : null,
      commission: rawData.commission ? Number(rawData.commission) : null,
      blocked: rawData.blocked === "true" ? true : false,
      // email: rawData.email || null,
    });

    //Log the validated data for debugging
    console.log("Validated data:", validatedData);

    //Remove undefined values and convert empty strings to null
    const cleanedData = Object.fromEntries(
      Object.entries(validatedData).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ])
    );

    //Check if email already exists
    if (cleanedData.email) {
      const existingSalesperson = await prisma.salesperson.findUnique({
        where: { email: cleanedData.email as string },
      });
      if (existingSalesperson) {
        throw new Error("Email already in use");
      }
    }

    //Create salesperson
    const newSalesperson = await prisma.salesperson.create({
      data: cleanedData,
    });

    //Log the new salesperson for debugging
    console.log("New salesperson:", newSalesperson);
  } catch (error) {
    console.error("Error in createSalesperson:", error);
    if (error instanceof z.ZodError) {
      console.error("Zod validation error:", error.errors);
      throw new Error(
        "Validation failed: " + error.errors.map((e) => e.message).join(", ")
      );
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("Email already in use");
      }
    }
    throw new Error("Failed to create salesperson");
  }
}
