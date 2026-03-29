import { Attribute } from "@strapi/strapi";
import {
  Data,
  Fields,
  Filters,
  Populate,
  Sort,
} from "@strapi/strapi/lib/services/entity-service/types/params";
import { WildcardNotation } from "@strapi/strapi/lib/services/entity-service/types/params/fields";

type AttributeOperators<T, K extends keyof T> = {
  $eq?: T[K] | Array<T[K]>;
  $ne?: T[K] | Array<T[K]>;
  $nei?: T[K] | Array<T[K]>;
  $in?: T[K][];
  $notIn?: T[K][];
  $lt?: T[K];
  $lte?: T[K];
  $gt?: T[K];
  $gte?: T[K];
  $between?: [T[K], T[K]];
  $contains?: T[K];
  $notContains?: T[K];
  $containsi?: T[K];
  $notContainsi?: T[K];
  $startsWith?: T[K];
  $endsWith?: T[K];
  $null?: boolean;
  $notNull?: boolean;
};

export interface FindParams<T extends Common.UID.Schema> {
  select?: Fields.Any<T>;
  where?: Filters.Any<T>;
  limit?: number;
  offset?: number;
  populate?: Exclude<Populate.Any<T>, WildcardNotation> | true;
  orderBy?: Sort.Any<T>;
}

export interface CreateParams<T extends Common.UID.Schema> {
  select?: Fields.Any<T>;
  populate?: Exclude<Populate.Any<T>, WildcardNotation> | true;
  data: Partial<Data.Input<T>>;
}
export interface UpdateParams<T extends Common.UID.Schema> {
  select?: Fields.Any<T>;
  populate?: Exclude<Populate.Any<T>, WildcardNotation> | true;
  where?: Partial<Filters.Any<T>>;
  data: Partial<Data.Input<T>>;
}
export interface DeleteParams<T extends Common.UID.Schema> {
  where?: Filters.Any<T>;
}

export type Pagination = {
  total_items: Number;
  total_pages: Number;
  current_page: Number;
  page_size: Number;
};
