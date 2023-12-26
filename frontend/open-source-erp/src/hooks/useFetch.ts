import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryKey,
} from "@tanstack/react-query";

/**
 * Custom hook for data fetching using React Query with simplified interface.
 *
 * This hook abstracts the standard `useQuery` hook from React Query to provide a more straightforward API
 * for components. Instead of constructing an options object, users can directly pass the query key,
 * fetch function, and additional options as separate arguments. This abstraction aims to simplify the usage
 * of React Query's `useQuery` for common scenarios, making it more accessible and easier to use within components.
 *
 * @param {TQueryKey} queryKey - Unique key to identify the query.
 * @param {Function} fetchFunction - Async function to fetch data. It should return a promise resolving to the desired data.
 * @param {Object} [options] - Optional configuration options for the query, excluding `queryKey` and `queryFn`.
 *
 * @returns {UseQueryResult<TQueryFnData, TError>} An object containing the query state: data, error, and loading status.
 *
 * @example
 * const fetchUsers = () => fetch('/api/users').then(res => res.json());
 * const { data: users, isLoading, error } = useFetch(['users'], fetchUsers);
 */
const useFetch = <
  TQueryFnData,
  TError = unknown,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  fetchFunction: (...args: object[]) => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TQueryFnData, TQueryKey>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TQueryFnData, TError> => {
  return useQuery<TQueryFnData, TError, TQueryFnData, TQueryKey>({
    ...options,
    queryKey,
    queryFn: () => fetchFunction(),
  });
};

export default useFetch;
