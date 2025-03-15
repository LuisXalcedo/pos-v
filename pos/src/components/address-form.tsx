"use client";

import type { Country, State, City } from "@/lib/definitions";
import { useTranslations } from "next-intl";
import { addressSchema, TAddressSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
// import { Form as HookForm } from "./ui/form";
// import Form from "next/form";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Loader2 } from "lucide-react";
import { getCountries, getStates, getCities } from "@/actions/address";

const defaultValues: TAddressSchema = {
  street: "",
  country: "",
  state: "",
  city: "",
  postal_code: "",
};

// interface AddressFormProps {
//   formRef?: React.RefObject<HTMLFormElement>;
// }

export default function AddressForm() {
  const t = useTranslations("Address");
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState({
    countries: false,
    states: false,
    cities: false,
    form: false,
  });

  const form = useForm<TAddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  });

  const watchCountry = form.watch("country");
  const watchState = form.watch("state");

  //Fetch countries on component mount
  useEffect(() => {
    async function loadCountries() {
      setIsLoading((prev) => ({ ...prev, countries: true }));
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        console.error("Error loading countries:", error);
      } finally {
        setIsLoading((prev) => ({ ...prev, countries: false }));
      }
    }
    loadCountries();
  }, []);

  //Fetch states when country changes
  useEffect(() => {
    if (!watchCountry) {
      setStates([]);
      setCities([]);
      return;
    }

    async function loadStates() {
      try {
        setIsLoading((prev) => ({ ...prev, states: true }));
        form.setValue("state", "");
        form.setValue("city", "");
        // Only call getStates if watchCountry is defined
        const data = await getStates(watchCountry as string);
        setStates(data);
      } catch (error) {
        console.error("Error loading states:", error);
        // Optionally handle the error in the UI
      } finally {
        setIsLoading((prev) => ({ ...prev, states: false }));
      }
    }

    loadStates();
  }, [watchCountry, form]);

  // Fetch cities when state changes
  useEffect(() => {
    if (!watchCountry || !watchState) {
      setCities([]);
      return;
    }

    async function loadCities() {
      try {
        setIsLoading((prev) => ({ ...prev, cities: true }));
        form.setValue("city", "");
        const data = await getCities(
          watchCountry as string,
          watchState as string
        );
        setCities(data);
      } catch (error) {
        console.error("Error loading cities:", error);
      } finally {
        setIsLoading((prev) => ({ ...prev, cities: false }));
      }
    }

    loadCities();
  }, [watchCountry, watchState, form]);

  // const onSubmit = (value: TAddressSchema) => {
  //   console.log(value);
  // };

  return (
    <AccordionItem value="address-form">
      <AccordionTrigger>{t("title")}</AccordionTrigger>
      <AccordionContent>
        <Form {...form}>
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("street")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("street")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("country")}</FormLabel>
                <Select
                  disabled={isLoading.countries}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectCountry")}>
                        {isLoading.countries ? (
                          <div className="flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                          </div>
                        ) : (
                          countries.find((c) => c.iso2 === field.value)?.name ||
                          t("selectCountry")
                        )}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.id} value={country.iso2}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("state")}</FormLabel>
                <Select
                  disabled={!watchCountry || isLoading.states}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectState")}>
                        {isLoading.states ? (
                          <div className="flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                          </div>
                        ) : (
                          states.find((s) => s.iso2 === field.value)?.name ||
                          t("selectState")
                        )}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.id} value={state.iso2}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("city")}</FormLabel>
                <Select
                  disabled={!watchState || isLoading.cities}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("selectCity")}>
                        {isLoading.cities ? (
                          <div className="flex items-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                          </div>
                        ) : (
                          field.value
                        )}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </AccordionContent>
    </AccordionItem>
  );
}
