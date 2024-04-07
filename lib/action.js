"use server";

const { revalidatePath } = require("next/cache");

export const revalidateClientSide = async (page) =>
  revalidatePath(page, "page");
