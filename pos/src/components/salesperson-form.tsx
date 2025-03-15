"use client";

import type React from "react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { createSalespersonAction } from "@/actions/salesperson";
import { salespersonSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Form from "next/form";
// import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useRouter } from "@/i18n/routing";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

type FormData = z.infer<typeof salespersonSchema>;

const defaultValues: FormData = {
  name: "",
  name2: "",
  id_employee: null,
  job_title: "",
  gender: "",
  commission: null,
  phone: "",
  email: "",
  blocked: false,
};

interface SalespersonFormProps {
  formRef?: React.RefObject<HTMLFormElement>;
}

export default function SalespersonForm({ formRef }: SalespersonFormProps) {
  const t = useTranslations("Salesperson");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(salespersonSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value.toString());
        }
      });
      await createSalespersonAction(formData);

      setSubmitSuccess(true);
      reset();
      // router.push("/dashboard/salespersons");
    } catch (error) {
      console.error("Form submission error:", error);
      if (error instanceof Error) {
        if (error.message === "Email already in use") {
          setError("email", {
            type: "manual",
            message: "Email already in use",
          });
        } else {
          setSubmitError(error.message);
        }
      } else {
        setSubmitError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <AccordionItem value="salesperson-form">
      <AccordionTrigger>{t("title")}</AccordionTrigger>
      <AccordionContent>
        <Form
          ref={formRef}
          action={createSalespersonAction}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">{t("firstName")}</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    id="name"
                    {...field}
                    // value={field.value ?? ""}
                    autoComplete="off"
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="name2">{t("lastName")}</Label>
              <Controller
                name="name2"
                control={control}
                render={({ field }) => (
                  <Input
                    id="name2"
                    {...field}
                    // value={field.value ?? ""}
                    autoComplete="off"
                  />
                )}
              />
              {errors.name2 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name2.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="id_employee">{t("idEmployee")}</Label>
              <Controller
                name="id_employee"
                control={control}
                render={({ field }) => (
                  <Input
                    id="id_employee"
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    value={field.value ?? ""}
                    autoComplete="off"
                  />
                )}
              />
              {errors.id_employee && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.id_employee.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="job_title">{t("jobTitle")}</Label>
              <Controller
                name="job_title"
                control={control}
                render={({ field }) => (
                  <Input
                    id="job_title"
                    {...field}
                    // value={field.value ?? ""}
                    autoComplete="off"
                  />
                )}
              />
              {errors.job_title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.job_title.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="gender-select">{t("gender")}</Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    name="gender"
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <SelectTrigger id="gender-select">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="commission">{t("commission")}</Label>
              <Controller
                name="commission"
                control={control}
                render={({ field }) => (
                  <Input
                    id="commission"
                    type="number"
                    step="0.1"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : null
                      )
                    }
                    value={field.value ?? ""}
                    autoComplete="off"
                  />
                )}
              />
              {errors.commission && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.commission.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">{t("phone")}</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Input
                    id="phone"
                    {...field}
                    // value={field.value ?? ""}
                    autoComplete="off"
                  />
                )}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">{t("email")}</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    {...field}
                    autoComplete="off"
                    // value={field.value ?? ""}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Controller
                name="blocked"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="blocked"
                    name="blocked"
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="blocked">{t("blocked")}</Label>
            </div>
          </div>

          {submitError && <p className="text-red-500">{submitError}</p>}
          {submitSuccess && (
            <p className="text-green-500">Salesperson created successfully!</p>
          )}

          {/* <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Salesperson"}
          </Button> */}
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
}
