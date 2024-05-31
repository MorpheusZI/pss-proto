"use client";

import { TextInput, Group, Button, Flex, Stack, Loader } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import * as React from "react";
import { z } from "zod";

import { api } from "~/trpc/react";

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(5, { message: "Password should have at least 5 letters" }),
});

const LoginPage = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: zodResolver(schema),
  });

  const checkPost = api.checkUser.check.useMutation({
    onError: (err) => {
      if (err.message === "Password yang dimasukan salah") {
        form.setErrors({ password: err.message })
        return
      }
      form.setErrors({ email: err.message })
    }
  });

  const handleSubmit = (values: { email: string; password: string }) =>
    checkPost.mutate(values);

  return (
    <Flex justify="center" align="center" h="100vh">
      <Flex
        direction="column"
        h="50%"
        w="30%"
        p={20}
        gap="lg"
        className="rounded-lg border shadow-md"
      >
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <TextInput
              type="password"
              withAsterisk
              label="Password"
              placeholder="Your Password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
          </Stack>

          <Group justify="flex-end" mt="lg">
            <Button
              variant="filled"
              type="submit"
              disabled={checkPost.isPending ?? false}
            >
              {checkPost.isPending ? <Loader size={20} /> : "Submit"}
            </Button>
          </Group>
        </form>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
