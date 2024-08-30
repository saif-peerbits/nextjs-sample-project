"use client";
import { i18n } from "@constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { loginSchema } from "@schema/login.schema";
import { loginApi } from "@services/login.service";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

// Define the form values type based on the schema
type FormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const router = useRouter();
  const t = useTranslations(i18n.FRONTENDTEST);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await loginApi(data.userName, data.password);

      // Save the token as a cookie
      Cookies.set("token", response.data.token, { expires: 7 });

      // Redirect to product
      router.push("/product");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      maxWidth="400px"
      gap={3}
      margin={"auto"}
    >
      <Typography variant="h4">Login</Typography>

      <Controller
        name="userName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label={t("USERNAME")}
            variant="standard"
            autoComplete="new-password"
            error={!!errors.userName}
            helperText={errors.userName ? errors.userName.message : ""}
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label={t("PASSWORD")}
            type="password"
            variant="standard"
            autoComplete="new-password"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ textTransform: "none" }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
