export interface Berry {
  id: number;
  name: string;
  url: string;
}

export interface BerryResponse {
  results: { name: string; url: string }[];
  count: number;
}