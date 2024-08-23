interface Response {
  ErrorMessage: string | null;
  ErrorCode: number;
  ErrorDescription: string;
  Data: OrderData;
}

interface OrderData {
  RebateDifference: number;
  ShippingIds: ShippingId[];
  AcceptLossOfReturnRight: boolean;
  Id: string;
  OrderNumber: string;
  State: number;
  VatMode: number;
  CreatedAt: string;
  ShippedAt: string | null;
  ConfirmedAt: string | null;
  PayedAt: string | null;
  SellerComment: string | null;
  Comments: any[];
  InvoiceNumberPrefix: string;
  InvoiceNumberPostfix: string | null;
  InvoiceNumber: number;
  InvoiceDate: string;
  InvoiceAddress: Address;
  ShippingAddress: Address;
  PaymentMethod: number;
  ShippingCost: number;
  TotalCost: number;
  AdjustmentCost: number;
  AdjustmentReason: string | null;
  OrderItems: OrderItem[];
  Currency: string;
  Seller: Seller;
  Buyer: any | null;
  UpdatedAt: string | null;
  TaxRate1: number;
  TaxRate2: number;
  BillBeeOrderId: number;
  BillBeeParentOrderId: number | null;
  VatId: string | null;
  Tags: any[];
  ShipWeightKg: number;
  LanguageCode: string | null;
  PaidAmount: number;
  ShippingProfileId: number | null;
  ShippingProviderId: number;
  ShippingProviderProductId: number;
  ShippingProviderName: string;
  ShippingProviderProductName: string;
  ShippingProfileName: string | null;
  PaymentInstruction: string | null;
  IsCancelationFor: string | null;
  PaymentTransactionId: string;
  DistributionCenter: string | null;
  DeliverySourceCountryCode: string | null;
  CustomInvoiceNote: string | null;
  CustomerNumber: string;
  PaymentReference: string;
  ShippingServices: string | null;
  Customer: Customer;
  History: HistoryEvent[];
  Payments: Payment[];
  LastModifiedAt: string;
  ArchivedAt: string | null;
  RestoredAt: string | null;
  ApiAccountId: number;
  ApiAccountName: string;
  MerchantVatId: string;
  CustomerVatId: string | null;
  IsFromBillbeeApi: boolean;
  WebUrl: string;
}

interface ShippingId {
  BillbeeId: number;
  ShippingId: string;
  Shipper: string;
  Created: string;
  TrackingUrl: string;
  ShippingProviderId: number;
  ShippingProviderProductId: number;
  ShippingCarrier: number;
  ShipmentType: number;
}

interface Address {
  BillbeeId: number;
  FirstName: string;
  LastName: string;
  Company: string;
  NameAddition: string | null;
  Street: string;
  HouseNumber: string;
  Zip: string;
  City: string;
  CountryISO2: string;
  Country: string;
  Line2: string;
  Email: string;
  State: string;
  Phone: string;
}

interface OrderItem {
  BillbeeId: number;
  TransactionId: string;
  Product: Product;
  Quantity: number;
  TotalPrice: number;
  TaxAmount: number;
  TaxIndex: number;
  Discount: number;
  Attributes: any[];
  GetPriceFromArticleIfAny: boolean;
  IsCoupon: boolean;
  ShippingProfileId: number | null;
  DontAdjustStock: boolean;
  UnrebatedTotalPrice: number;
  SerialNumber: string | null;
  InvoiceSKU: string;
}

interface Product {
  OldId: string | null;
  Id: string | null;
  Title: string;
  Weight: number;
  SKU: string;
  SkuOrId: string;
  IsDigital: boolean | null;
  Images: any | null;
  EAN: string;
  PlatformData: any | null;
  TARICCode: string | null;
  CountryOfOrigin: string | null;
  BillbeeId: number;
  Type: number;
}

interface Seller {
  Platform: string;
  BillbeeShopName: string;
  BillbeeShopId: number;
  Id: string;
  Nick: string | null;
  FirstName: string | null;
  LastName: string | null;
  FullName: string;
  Email: string | null;
}

interface Customer {
  Id: number;
  Name: string;
  Email: string;
  Tel1: string;
  Tel2: string | null;
  Number: number;
  PriceGroupId: number | null;
  LanguageId: number | null;
  DefaultMailAddress: Contact;
  DefaultCommercialMailAddress: string | null;
  DefaultStatusUpdatesMailAddress: string | null;
  DefaultPhone1: Contact;
  DefaultPhone2: string | null;
  DefaultFax: string | null;
  VatId: string | null;
  Type: string | null;
  MetaData: MetaData[];
  ArchivedAt: string | null;
  RestoredAt: string | null;
}

interface Contact {
  Id: number;
  TypeId: number;
  TypeName: string;
  SubType: string;
  Value: string;
}

interface MetaData {
  Id: number;
  TypeId: number;
  TypeName: string;
  SubType: string;
  Value: string;
}

interface HistoryEvent {
  Created: string;
  EventTypeName: string;
  Text: string;
  EmployeeName: string | null;
  TypeId: number;
  VatFlags?: VatFlags;
}

interface VatFlags {
  ThirdPartyCountry: boolean;
  SrcCountryIsEqualToDstCountry: boolean;
  CustomerHasVatId: boolean;
  EuDeliveryThresholdExceeded: boolean;
  OssEnabled: boolean;
  SellerIsRegisteredInDstCountry: boolean;
  OrderDistributionCountryIsEmpty: boolean;
  UserProfileCountryIsEmpty: boolean;
  SetIglWhenVatIdIsAvailableEnabled: boolean;
  RatesFrom: string;
  VatIdFrom: string;
  IsDistanceSale: boolean;
}

interface Payment {
  BillbeeId: number;
  TransactionId: string;
  PayDate: string;
  PaymentType: number;
  SourceTechnology: string;
  SourceText: string;
  PayValue: number;
  Purpose: string | null;
  Name: string;
}

interface Label {
  [key: string]: string;
}
