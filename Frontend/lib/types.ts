export type ContentEntry<TFields> = {
  uuid: string;
  locale: string;
  published_at?: string | null;
  fields: TFields;
};

export type NoteFields = {
  title?: string;
  slug?: string;
  body?: string;
  "seo-title"?: string;
  "seo-description"?: string;
  "author-name"?: string;
  "author-user-id"?: string;
};

export type SiteSettingsFields = {
  "site-title"?: string;
  address?: string;
  "working-hours"?: string;
  email?: string;
  phone?: string;
  telegram?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
};

export type ZoneFields = {
  name: string;
  description?: string;
  region?: string | string[];
  "zone-type"?: string | string[];
  "total-area"?: number;
  "free-area"?: number;
  "enterprises-count"?: number;
  "jobs-created"?: number;
  infrastructure?: string | string[];
  district?: string | { uuid: string; fields?: { name: string; code?: string } };
  image?: string | { url?: string; original_url?: string };
  "decision-file"?: string | { url?: string; original_url?: string };
  "lot-description"?: string;
  "lot-urls"?: string[] | string;
};

export type ProjectFields = {
  "company-name": string;
  title?: string;
  description?: string;
  region?: string | string[];
  address?: string;
  area?: number;
  "investment-amount"?: string;
  "workers-count"?: number | string;
  "established-year"?: number;
  stir?: string;
  status?: string;
  "sanoat-zonasi"?: string | { uuid: string; fields?: ZoneFields };
  "project-image"?: string | { url?: string; original_url?: string };
  district?: string | { uuid: string; fields?: { name: string; code?: string } };
  lots?: string[];
  "in-progress-project"?: string;
  "completed-project"?: string;
  "lot-description"?: string;
  "lot-urls"?: string[] | string;
};

export type LeadershipFields = {
  fullname: string;
  position: string;
  "reception-days"?: string;
  phone?: string;
  email?: string;
  image?: string | { url?: string; original_url?: string };
};

export type NewsFields = {
  title: string;
  excerpt?: string;
  content?: string;
  "published-date"?: string;
  image?: string | { url?: string; original_url?: string };
};

export type LegalDocFields = {
  title: string;
  "doc-number"?: string;
  number?: string;
  date?: string;
  description?: string;
  "source-url"?: string;
  url?: string;
  "pdf-file"?: string | { url?: string; original_url?: string };
};

export type DistrictFields = {
  name: string;
  code?: string;
};

export type Paginated<T> = {
  data: T[];
  meta?: {
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
  };
  links?: Record<string, string | null>;
};
