import { useQuery } from '@tanstack/react-query';
import type { ParamsOption, RequestBodyOption } from 'openapi-fetch';
import type { paths } from '@/lib/api/mtparts';
import client from '@/lib/api/index';

type QueryOptions<T> = ParamsOption<T> &
  RequestBodyOption<T> & {
    // add your custom options here
    reactQuery?: Partial<{
      enabled: boolean; // Note: React Query type’s inference is difficult to apply automatically, hence manual option passing here
      gcTime: number;
      // add other React Query options as needed
    }>;
  };

/// paths

const GET_CONTRACTORS = '/api/Contractors';
const GET_ORDERS = '/api/Orders';
const GET_IFIRMA_SETTINGS = '/api/settings/ifirmaSettings';
const GET_IFIRMA_SETTING = '/api/settings/ifirmaSettings/{id}';
const GET_MONGODB_SETTINGS = '/api/settings/mongodbSettings';
const GET_MONGODB_SETTING = '/api/settings/mongodbSettings/{id}';
const GET_POLCAR_SETTINGS = '/api/settings/polcarSettings';
const GET_POLCAR_SETTING = '/api/settings/polcarSettings/{id}';
const GET_USER_SETTINGS = '/api/settings/userSettings';
const GET_USER_SETTING = '/api/settings/userSettings/{id}';

export {
  GET_CONTRACTORS,
  GET_ORDERS,
  GET_IFIRMA_SETTINGS,
  GET_IFIRMA_SETTING,
  GET_MONGODB_SETTINGS,
  GET_MONGODB_SETTING,
  GET_POLCAR_SETTINGS,
  GET_POLCAR_SETTING,
  GET_USER_SETTINGS,
  GET_USER_SETTING
};

export function GetContractors({ params, body, reactQuery }: QueryOptions<paths[typeof GET_CONTRACTORS]['get']>) {
  return useQuery({
    ...reactQuery,
    queryKey: [GET_CONTRACTORS],
    queryFn: async ({ signal }) => {
      const { data } = await client.GET(GET_CONTRACTORS, {
        params,
        signal
      });
      return data;
    }
  });
}

export function GetOrders({ params, body, reactQuery }: QueryOptions<paths[typeof GET_ORDERS]['get']>) {
  return useQuery({
    ...reactQuery,
    queryKey: [GET_ORDERS],
    queryFn: async ({ signal }) => {
      const { data } = await client.GET(GET_ORDERS, {
        params,
        signal
      });
      return data;
    }
  });
}

export function GetiFirmaSettings({
  params,
  body,
  reactQuery
}: QueryOptions<paths[typeof GET_IFIRMA_SETTINGS]['get']>) {
  return useQuery({
    ...reactQuery,
    queryKey: [GET_IFIRMA_SETTINGS],
    queryFn: async ({ signal }) => {
      const { data } = await client.GET(GET_IFIRMA_SETTINGS, {
        params,
        signal
      });
      return data;
    }
  });
}

export function GetiFirmaSetting({ params, body, reactQuery }: QueryOptions<paths[typeof GET_IFIRMA_SETTING]['get']>) {
  return useQuery({
    ...reactQuery,
    queryKey: [GET_IFIRMA_SETTING],
    queryFn: async ({ signal }) => {
      const { data } = await client.GET(GET_IFIRMA_SETTING, {
        params,
        signal
      });
      return data;
    }
  });
}

export function GetMongoDBSettings({
  params,
  body,
  reactQuery
}: QueryOptions<paths[typeof GET_MONGODB_SETTINGS]['get']>) {
  return useQuery({
    ...reactQuery,
    queryKey: [GET_MONGODB_SETTINGS],
    queryFn: async ({ signal }) => {
      const { data } = await client.GET(GET_MONGODB_SETTINGS, {
        params,
        signal
      });
      return data;
    }
  });
}

export function GetMongoDBSetting({
  params,
  body,
  reactQuery
}: QueryOptions<paths[typeof GET_MONGODB_SETTING]['get']>) {
  return useQuery({
    ...reactQuery,
    queryKey: [GET_MONGODB_SETTING],
    queryFn: async ({ signal }) => {
      const { data } = await client.GET(GET_MONGODB_SETTING, {
        params,
        signal
      });
      return data;
    }
  });
}

export function GetPolcarSettings({
  params,
  body,
  reactQuery
}: QueryOptions<paths[typeof GET_POLCAR_SETTINGS]['get']>) {
  return useQuery({
    ...reactQuery,
    queryKey: [GET_POLCAR_SETTINGS],
    queryFn: async ({ signal }) => {
      const { data } = await client.GET(GET_POLCAR_SETTINGS, {
        params,
        signal
      });
      return data;
    }
  });
}

export function GetPolcarSetting({ params, body, reactQuery }: QueryOptions<paths[typeof GET_POLCAR_SETTING]['get']>) {
  return useQuery({
    ...reactQuery,
    queryKey: [GET_POLCAR_SETTING],
    queryFn: async ({ signal }) => {
      const { data } = await client.GET(GET_POLCAR_SETTING, {
        params,
        signal
      });
      return data;
    }
  });
}

export function GetUserSettings({ params, body, reactQuery }: QueryOptions<paths[typeof GET_USER_SETTINGS]['get']>) {
  return useQuery({
    ...reactQuery,
    queryKey: [GET_USER_SETTINGS],
    queryFn: async ({ signal }) => {
      const { data } = await client.GET(GET_USER_SETTINGS, {
        params,
        signal
      });
      return data;
    }
  });
}

export function GetUserSetting({ params, body, reactQuery }: QueryOptions<paths[typeof GET_USER_SETTING]['get']>) {
  return useQuery({
    ...reactQuery,
    queryKey: [GET_USER_SETTING],
    queryFn: async ({ signal }) => {
      const { data } = await client.GET(GET_USER_SETTING, {
        params,
        signal
      });
      return data;
    }
  });
}
