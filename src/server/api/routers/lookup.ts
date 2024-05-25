import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(5, { message: "Password should have at least 5 letters" }),
});

export const lookupUser = createTRPCRouter({
  check: publicProcedure
    .input(schema)
    .mutation(({ input }) => {
      console.log(input);
      return `Hello ${input.email} and ${input.password}`;
    }),
});
