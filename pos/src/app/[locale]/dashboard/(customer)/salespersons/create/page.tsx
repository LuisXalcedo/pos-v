"use client";

import { Accordion } from "@radix-ui/react-accordion";
import SalespersonForm from "@/components/salesperson-form";
import AddressForm from "@/components/address-form";

export default function Page() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="address-form"
    >
      <SalespersonForm />
      <AddressForm />
    </Accordion>
  );
}
