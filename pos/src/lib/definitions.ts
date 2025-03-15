export type Salesperson = {
  name: string;
  name2: string;
  id_employee: number;
  job_title: string;
  gender: string;
  commission: number;
  phone: string;
  email: string;
  blocked: boolean;
};

export interface Country {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  phonecode: string;
}

export interface State {
  id: number;
  name: string;
  iso2: string;
  country_id: number;
  country_code: string;
}

export interface City {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  country_id: number;
  country_code: string;
}

export interface AddressFormValues {
  street: string;
  country: string;
  state: string;
  city: string;
  postal_code: string;
}
