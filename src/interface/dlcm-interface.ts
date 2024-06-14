export interface IDlcmData {
  results: IDLCMDetails[];
  totalCount: number;
  totalItems: string;
  totalPages: number;
  currentPage: number;
  next: number;
  pageSize: number;
}

export interface IDLCMDetails {
  Address: string;
  LocationName: string;
  PartnerCode: string;
  PhoneNumber: string;
  SalesRepBusinessLocation: string;
  name: string;
  Category: string;
  MoMoAccNo: string;
  MSISDNNo: string;
  MailAddress: string;
  Country: string;
  CountryState: string;
  ISTag: string;
  SerialNo: string;
  LG: string;
  Shipment: string;
  Description: string;
  PartnerName: string;
  PartnerMail: string;
  ParentRequestHolder: string;
  PartnerBusinessLocation: string;
  SalesRepMail: string;
  Device: string;
  IMEINo2: string;
  CommentFromUnlock: string;
  Comment: string;
  BusinessLocation: string;
  Tenant: string;
  Error: string;
  CreatedAt: string;
  UpdatedAt: string;
  State: string;
}
