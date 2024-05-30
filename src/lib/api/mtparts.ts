/**
 * Generated by orval v6.28.2 🍺
 * Do not edit manually.
 * Web, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
 * OpenAPI spec version: 1.0
 */
import {
  useMutation,
  useQuery
} from '@tanstack/react-query'
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import { customInstance } from './custom-instance';
export type GetOrdersParams = {
dateFrom: string;
dateTo: string;
};

export interface ResponseDto {
  /** @nullable */
  informacja?: string | null;
  kod?: number;
}

export interface OrderItem {
  /** @nullable */
  partName?: string | null;
  /** @nullable */
  partNumber?: string | null;
  quantity?: number;
  totalPrice?: number;
}

export interface OrderDto {
  date?: string;
  /** @nullable */
  id?: string | null;
  isSelected?: boolean;
  /** @nullable */
  items?: OrderItem[] | null;
  readonly itemsCount?: number;
  /** @nullable */
  number?: string | null;
  /** @nullable */
  person?: string | null;
  readonly totalPrice?: number;
}

export interface InvoiceResponseDto {
  response?: ResponseDto;
}

export interface DeleteContractorCommand {
  /** @minLength 1 */
  id: string;
}

export interface CreateInvoiceCommand {
  contractor?: Contractor;
  invoiceNumber?: number;
  issueDate?: string;
  /** @minItems 1 */
  orders: OrderDto[];
  saleDate?: string;
}

export interface CreateContractorCommand {
  /** @nullable */
  city?: string | null;
  /** @nullable */
  email?: string | null;
  /** @nullable */
  name?: string | null;
  /** @nullable */
  nip?: string | null;
  /** @nullable */
  street?: string | null;
  /** @nullable */
  zipCode?: string | null;
}

export interface Contractor {
  /** @nullable */
  city?: string | null;
  createdAt?: string;
  /** @nullable */
  email?: string | null;
  /** @nullable */
  id?: string | null;
  /** @nullable */
  name?: string | null;
  /** @nullable */
  nip?: string | null;
  /** @nullable */
  street?: string | null;
  /** @nullable */
  zipCode?: string | null;
}




type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


export const getContractors = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<Contractor[]>(
      {url: `/api/Contractors`, method: 'GET', signal
    },
      options);
    }
  

export const getGetContractorsQueryKey = () => {
    return [`/api/Contractors`] as const;
    }

    
export const getGetContractorsQueryOptions = <TData = Awaited<ReturnType<typeof getContractors>>, TError = unknown>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getContractors>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetContractorsQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getContractors>>> = ({ signal }) => getContractors(requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getContractors>>, TError, TData> & { queryKey: QueryKey }
}

export type GetContractorsQueryResult = NonNullable<Awaited<ReturnType<typeof getContractors>>>
export type GetContractorsQueryError = unknown

export const useGetContractors = <TData = Awaited<ReturnType<typeof getContractors>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getContractors>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetContractorsQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




export const createContractor = (
    createContractorCommand: CreateContractorCommand,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/api/Contractors`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createContractorCommand
    },
      options);
    }
  


export const getCreateContractorMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createContractor>>, TError,{data: CreateContractorCommand}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof createContractor>>, TError,{data: CreateContractorCommand}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createContractor>>, {data: CreateContractorCommand}> = (props) => {
          const {data} = props ?? {};

          return  createContractor(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type CreateContractorMutationResult = NonNullable<Awaited<ReturnType<typeof createContractor>>>
    export type CreateContractorMutationBody = CreateContractorCommand
    export type CreateContractorMutationError = unknown

    export const useCreateContractor = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createContractor>>, TError,{data: CreateContractorCommand}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationResult<
        Awaited<ReturnType<typeof createContractor>>,
        TError,
        {data: CreateContractorCommand},
        TContext
      > => {

      const mutationOptions = getCreateContractorMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const deleteContractor = (
    deleteContractorCommand: DeleteContractorCommand,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<void>(
      {url: `/api/Contractors`, method: 'DELETE',
      headers: {'Content-Type': 'application/json', },
      data: deleteContractorCommand
    },
      options);
    }
  


export const getDeleteContractorMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteContractor>>, TError,{data: DeleteContractorCommand}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof deleteContractor>>, TError,{data: DeleteContractorCommand}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteContractor>>, {data: DeleteContractorCommand}> = (props) => {
          const {data} = props ?? {};

          return  deleteContractor(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteContractorMutationResult = NonNullable<Awaited<ReturnType<typeof deleteContractor>>>
    export type DeleteContractorMutationBody = DeleteContractorCommand
    export type DeleteContractorMutationError = unknown

    export const useDeleteContractor = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteContractor>>, TError,{data: DeleteContractorCommand}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationResult<
        Awaited<ReturnType<typeof deleteContractor>>,
        TError,
        {data: DeleteContractorCommand},
        TContext
      > => {

      const mutationOptions = getDeleteContractorMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const createInvoice = (
    createInvoiceCommand: CreateInvoiceCommand,
 options?: SecondParameter<typeof customInstance>,) => {
      
      
      return customInstance<InvoiceResponseDto>(
      {url: `/api/Invoices`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createInvoiceCommand
    },
      options);
    }
  


export const getCreateInvoiceMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createInvoice>>, TError,{data: CreateInvoiceCommand}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationOptions<Awaited<ReturnType<typeof createInvoice>>, TError,{data: CreateInvoiceCommand}, TContext> => {
const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createInvoice>>, {data: CreateInvoiceCommand}> = (props) => {
          const {data} = props ?? {};

          return  createInvoice(data,requestOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type CreateInvoiceMutationResult = NonNullable<Awaited<ReturnType<typeof createInvoice>>>
    export type CreateInvoiceMutationBody = CreateInvoiceCommand
    export type CreateInvoiceMutationError = unknown

    export const useCreateInvoice = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createInvoice>>, TError,{data: CreateInvoiceCommand}, TContext>, request?: SecondParameter<typeof customInstance>}
): UseMutationResult<
        Awaited<ReturnType<typeof createInvoice>>,
        TError,
        {data: CreateInvoiceCommand},
        TContext
      > => {

      const mutationOptions = getCreateInvoiceMutationOptions(options);

      return useMutation(mutationOptions);
    }
    
export const getOrders = (
    params: GetOrdersParams,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      
      
      return customInstance<OrderDto[]>(
      {url: `/api/Orders`, method: 'GET',
        params, signal
    },
      options);
    }
  

export const getGetOrdersQueryKey = (params: GetOrdersParams,) => {
    return [`/api/Orders`, ...(params ? [params]: [])] as const;
    }

    
export const getGetOrdersQueryOptions = <TData = Awaited<ReturnType<typeof getOrders>>, TError = unknown>(params: GetOrdersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getOrders>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}
) => {

const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetOrdersQueryKey(params);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getOrders>>> = ({ signal }) => getOrders(params, requestOptions, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getOrders>>, TError, TData> & { queryKey: QueryKey }
}

export type GetOrdersQueryResult = NonNullable<Awaited<ReturnType<typeof getOrders>>>
export type GetOrdersQueryError = unknown

export const useGetOrders = <TData = Awaited<ReturnType<typeof getOrders>>, TError = unknown>(
 params: GetOrdersParams, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getOrders>>, TError, TData>>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const queryOptions = getGetOrdersQueryOptions(params,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey ;

  return query;
}




