import { TRPCError } from "@trpc/server";
import { user } from "Utilities/ProtoStorage/user";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(5, { message: "Password should have at least 5 letters" }),
});

const PasswordNotMatchErr: TRPCError = {
  name: "PasswordNotMatchErr",
  code: "BAD_REQUEST",
  message: "Password yang dimasukan salah"
}

const EmailNotFoundErr: TRPCError = {
  name: "EmailNotFoundErr",
  code: "BAD_REQUEST",
  message: "Email yang dimasukan tidak ketemu"
}

export const lookupUser = createTRPCRouter({
  check: publicProcedure
    .input(schema)
    .mutation(({ input }) => {
      const FoundEmail = user.find((usr) => usr.email === input.email)
      if (!FoundEmail) throw new TRPCError(EmailNotFoundErr)

      const FoundPassword = user.find((usr) => usr.password === input.password)
      if (!FoundPassword) throw new TRPCError(PasswordNotMatchErr)

      return FoundEmail;
    }),
});
