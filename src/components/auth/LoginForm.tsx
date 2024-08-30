"use client";
import { createLoginSchema } from "@schema/login.schema";
import { loginApi } from "@services/login.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { errorToast } from "@config/toast.config";
import { i18n } from "@constant";
import { useTranslations } from "next-intl";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const t = useTranslations(i18n.FRONTENDTEST);
  const loginSchema = createLoginSchema(t);

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true);
    loginApi(data.userName, data.password)
      ?.then((response) => {
        // Save the token as a cookie
        Cookies.set("token", response.data.token, { expires: 7 });

        // Redirect to product
        router.push("/product");
      })
      .catch((error) => {
        errorToast(error?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
        disabled={loading}
        sx={{ textTransform: "none", display: "flex", gap: 2 }}
      >
        Login
        {loading && (
          <CircularProgress
            size="1.2rem"
            sx={{ color: "white" }}
            thickness={5}
          />
        )}
      </Button>
    </Box>
  );
};

export default LoginForm;
