import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { ParamsOption, RequestBodyOption } from 'openapi-fetch';
import type { paths } from '@/lib/api/mtparts';
import client from '@/lib/api/index';

type MutationOptions<R, T> = UseMutationOptions<R, any, RequestBodyOption<T> & ParamsOption<T>, any>;

// paths
const CREATE_IFIRMA_SETTING = '/api/settings/ifirmaSettings';
const UPDATE_IFIRMA_SETTING = '/api/settings/ifirmaSettings/{id}';
const DELETE_IFIRMA_SETTING = '/api/settings/ifirmaSettings/{id}';
const CREATE_MONGODB_SETTING = '/api/settings/mongodbSettings';
const UPDATE_MONGODB_SETTING = '/api/settings/mongodbSettings/{id}';
const DELETE_MONGODB_SETTING = '/api/settings/mongodbSettings/{id}';
const CREATE_POLCAR_SETTING = '/api/settings/polcarSettings';
const UPDATE_POLCAR_SETTING = '/api/settings/polcarSettings/{id}';
const DELETE_POLCAR_SETTING = '/api/settings/polcarSettings/{id}';
const CREATE_USER_SETTING = '/api/settings/userSettings';
const UPDATE_USER_SETTING = '/api/settings/userSettings/{id}';
const DELETE_USER_SETTING = '/api/settings/userSettings/{id}';
const CREATE_CONTRACTOR = '/api/Contractors';
const DELETE_CONTRACTOR = '/api/Contractors/{id}';

export {
  CREATE_IFIRMA_SETTING,
  UPDATE_IFIRMA_SETTING,
  DELETE_IFIRMA_SETTING,
  CREATE_MONGODB_SETTING,
  UPDATE_MONGODB_SETTING,
  DELETE_MONGODB_SETTING,
  CREATE_POLCAR_SETTING,
  UPDATE_POLCAR_SETTING,
  DELETE_POLCAR_SETTING,
  CREATE_USER_SETTING,
  UPDATE_USER_SETTING,
  DELETE_USER_SETTING
};

// iFirma settings
export function CreateIFirmaSetting(
  options?: MutationOptions<number | undefined, paths[typeof CREATE_IFIRMA_SETTING]['post']>
) {
  return useMutation({
    mutationFn: async ({ body, params }) => {
      const { data } = await client.POST(CREATE_IFIRMA_SETTING, { body });

      return data;
    },
    ...options
  });
}

export function UpdateIFirmaSetting(
  options?: MutationOptions<number | undefined, paths[typeof UPDATE_IFIRMA_SETTING]['put']>
) {
  return useMutation({
    mutationFn: async ({ body, params }) => {
      const { data } = await client.PUT(UPDATE_IFIRMA_SETTING, { body, params });

      return data;
    },
    ...options
  });
}

export function DeleteIFirmaSetting(
  options?: MutationOptions<number | undefined, paths[typeof DELETE_IFIRMA_SETTING]['delete']>
) {
  return useMutation({
    mutationFn: async ({ body, params }) => {
      const { data } = await client.DELETE(DELETE_IFIRMA_SETTING, { params });

      return data;
    },
    ...options
  });
}

// MongoDB settings
export function CreateMongoDBSetting(
  options?: MutationOptions<number | undefined, paths[typeof CREATE_MONGODB_SETTING]['post']>
) {
  return useMutation({
    mutationFn: async ({ body, params }) => {
      const { data } = await client.POST(CREATE_MONGODB_SETTING, { body });

      return data;
    },
    ...options
  });
}

export function UpdateMongoDBSetting(
  options?: MutationOptions<number | undefined, paths[typeof UPDATE_MONGODB_SETTING]['put']>
) {
  return useMutation({
    mutationFn: async ({ body, params }) => {
      const { data } = await client.PUT(UPDATE_MONGODB_SETTING, { body, params });

      return data;
    },
    ...options
  });
}

export function DeleteMongoDBSetting(
  options?: MutationOptions<number | undefined, paths[typeof DELETE_MONGODB_SETTING]['delete']>
) {
  return useMutation({
    mutationFn: async ({ body, params }) => {
      const { data } = await client.DELETE(DELETE_MONGODB_SETTING, { params });

      return data;
    },
    ...options
  });
}

// Polcar settings
export function CreatePolcarSetting(
  options?: MutationOptions<number | undefined, paths[typeof CREATE_POLCAR_SETTING]['post']>
) {
  return useMutation({
    mutationFn: async ({ body, params }) => {
      const { data } = await client.POST(CREATE_POLCAR_SETTING, { body });

      return data;
    },
    ...options
  });
}

export function UpdatePolcarSetting(
  options?: MutationOptions<number | undefined, paths[typeof UPDATE_POLCAR_SETTING]['put']>
) {
  return useMutation({
    mutationFn: async ({ body, params }) => {
      const { data } = await client.PUT(UPDATE_POLCAR_SETTING, { body, params });

      return data;
    },
    ...options
  });
}

export function DeletePolcarSetting(
  options?: MutationOptions<number | undefined, paths[typeof DELETE_POLCAR_SETTING]['delete']>
) {
  return useMutation({
    mutationFn: async ({ body, params }) => {
      const { data } = await client.DELETE(DELETE_POLCAR_SETTING, { params });

      return data;
    },
    ...options
  });
}

// User settings
export function CreateUserSetting(
  options?: MutationOptions<number | undefined, paths[typeof CREATE_USER_SETTING]['post']>
) {
  return useMutation({
    mutationFn: async ({ body, params }) => {
      const { data } = await client.POST(CREATE_USER_SETTING, { body });

      return data;
    },
    ...options
  });
}

export function UpdateUserSetting(
  options?: MutationOptions<number | undefined, paths[typeof UPDATE_USER_SETTING]['put']>
) {
  return useMutation({
    mutationFn: async ({ body, params }) => {
      const { data } = await client.PUT(UPDATE_USER_SETTING, { body, params });

      return data;
    },
    ...options
  });
}

export function DeleteUserSetting(
  options?: MutationOptions<number | undefined, paths[typeof DELETE_USER_SETTING]['delete']>
) {
  return useMutation({
    mutationFn: async ({ body, params }) => {
      const { data } = await client.DELETE(DELETE_USER_SETTING, { params });

      return data;
    },
    ...options
  });
}

// Contractors
export function CreateContractor(
  options?: MutationOptions<number | undefined, paths[typeof CREATE_CONTRACTOR]['post']>
) {
  return useMutation({
    mutationFn: async ({ body, params }) => {
      const { data } = await client.POST(CREATE_CONTRACTOR, { body });

      return data;
    },
    ...options
  });
}

export function DeleteContractor(
  options?: MutationOptions<number | undefined, paths[typeof DELETE_CONTRACTOR]['delete']>
) {
  return useMutation({
    mutationFn: async ({ body, params }) => {
      const { data } = await client.DELETE(DELETE_CONTRACTOR, { params });

      return data;
    },
    ...options
  });
}
