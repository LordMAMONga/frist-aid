export interface LocalizedString {
  ru: string;
  ky: string;
}

export interface HospitalEntity {
  id: string;
  name: LocalizedString;
  address: LocalizedString;
  lat: number;
  lng: number;
  phone: string;
}
