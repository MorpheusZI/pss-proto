"use client";

import {
  TextInput,
  Group,
  Button,
  Flex,
  Stack,
  Loader,
  PasswordInput,
  rem,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconLockOpen } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import * as React from "react";
import { z } from "zod";

import { api } from "~/trpc/react";

const schema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(5),
});

const IconLoggedIn = (
  <IconLockOpen style={{ width: rem(10), height: rem(10) }} />
);

const LoginPage = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: zodResolver(schema),
  });

  const LoginPost = api.User.Login.useMutation({
    onSuccess: (user) => {
      notifications.show({
        title: "Login Berhasil",
        message: `Anda berhasil login sebagai ${user.username}`,
        bg: "blue",
        color: "green",
        styles: (theme) => ({
          title: { color: "white", fontWeight: "bold" },
          description: { color: "white" },
        }),
      });
    },
    onError: (err) => {
      if (err.message === "Password yang dimasukan salah") {
        form.setErrors({ password: err.message });
        return;
      }
      form.setErrors({ email: err.message });
    },
  });

  const handleSubmit = (values: { email: string; password: string }) =>
    LoginPost.mutate(values);

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
            <PasswordInput
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
              disabled={LoginPost.isPending ?? false}
            >
              {LoginPost.isPending ? <Loader size={20} /> : "Submit"}
            </Button>
          </Group>
        </form>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
