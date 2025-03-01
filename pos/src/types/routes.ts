/**
 * A union of all valid route paths that can be used throughout the application.
 *
 * @remarks
 * - This type enforces type-safe navigation, ensuring that only recognized paths are used.
 * - Each string in this union represents a valid URL route within the application's routing system.
 *
 * @public
 */
export type ValidHref =
  | "/"
  | "/dashboard/products"
  | "/dashboard/uom"
  | "/dashboard/product-ledger"
  | "/dashboard/product-discount"
  | "/dashboard/product-group"
  | "/dashboard/family"
  | "/dashboard/season"
  | "/dashboard/salespersons"
  | "/dashboard/salespersons/create"
  // | "/dashboard/salespersons/[id]/edit"
  // | "/dashboard/salespersons/[id]/delete"
  | "/dashboard/customers"
  | "/dashboard/customer-ledger"
  | "/dashboard/customer-discount"
  | "/dashboard/customer-group"
  | "/dashboard/end-of-day"
  | "/dashboard/report-x"
  | "/dashboard/report-z"
  | "/login"
  | "/logout"
  | "/settings";
