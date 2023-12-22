/* tslint:disable */
/* eslint-disable */
/**
 * Open Source ERP API
 * Api schema for ERP backend.
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface AccessTokenResponse
 */
export interface AccessTokenResponse {
    /**
     * 
     * @type {string}
     * @memberof AccessTokenResponse
     */
    'access_token': string;
}
/**
 * 
 * @export
 * @interface ApiResponse
 */
export interface ApiResponse {
    /**
     * 
     * @type {number}
     * @memberof ApiResponse
     */
    'status'?: number;
    /**
     * 
     * @type {string}
     * @memberof ApiResponse
     */
    'message'?: string;
    /**
     * 
     * @type {ApiResponseData}
     * @memberof ApiResponse
     */
    'data'?: ApiResponseData | null;
}
/**
 * @type ApiResponseData
 * @export
 */
export type ApiResponseData = Array<object> | object;

/**
 * 
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
    /**
     * 
     * @type {number}
     * @memberof ErrorResponse
     */
    'code'?: number;
    /**
     * 
     * @type {string}
     * @memberof ErrorResponse
     */
    'message'?: string;
}
/**
 * 
 * @export
 * @interface LoginUserRequest
 */
export interface LoginUserRequest {
    /**
     * 
     * @type {string}
     * @memberof LoginUserRequest
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof LoginUserRequest
     */
    'password': string;
}
/**
 * 
 * @export
 * @interface LoginUserResponse
 */
export interface LoginUserResponse {
    /**
     * 
     * @type {number}
     * @memberof LoginUserResponse
     */
    'status'?: number;
    /**
     * 
     * @type {string}
     * @memberof LoginUserResponse
     */
    'message'?: string;
    /**
     * 
     * @type {Array<AccessTokenResponse>}
     * @memberof LoginUserResponse
     */
    'data'?: Array<AccessTokenResponse>;
}
/**
 * 
 * @export
 * @interface MultiUsersResponse
 */
export interface MultiUsersResponse {
    /**
     * 
     * @type {number}
     * @memberof MultiUsersResponse
     */
    'status'?: number;
    /**
     * 
     * @type {string}
     * @memberof MultiUsersResponse
     */
    'message'?: string;
    /**
     * 
     * @type {Array<UserResponse>}
     * @memberof MultiUsersResponse
     */
    'data'?: Array<UserResponse>;
}
/**
 * 
 * @export
 * @interface SingleUserResponse
 */
export interface SingleUserResponse {
    /**
     * 
     * @type {number}
     * @memberof SingleUserResponse
     */
    'status'?: number;
    /**
     * 
     * @type {string}
     * @memberof SingleUserResponse
     */
    'message'?: string;
    /**
     * 
     * @type {UserResponse}
     * @memberof SingleUserResponse
     */
    'data'?: UserResponse;
}
/**
 * 
 * @export
 * @interface UserRequest
 */
export interface UserRequest {
    /**
     * 
     * @type {number}
     * @memberof UserRequest
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof UserRequest
     */
    'username': string;
    /**
     * 
     * @type {string}
     * @memberof UserRequest
     */
    'firstName'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserRequest
     */
    'lastName'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserRequest
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof UserRequest
     */
    'password': string;
    /**
     * 
     * @type {string}
     * @memberof UserRequest
     */
    'status': UserRequestStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof UserRequest
     */
    'role'?: UserRequestRoleEnum;
    /**
     * 
     * @type {string}
     * @memberof UserRequest
     */
    'createdAt'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserRequest
     */
    'updatedAt'?: string;
}

export const UserRequestStatusEnum = {
    Active: 'active',
    Inactive: 'inactive'
} as const;

export type UserRequestStatusEnum = typeof UserRequestStatusEnum[keyof typeof UserRequestStatusEnum];
export const UserRequestRoleEnum = {
    Admin: 'admin',
    User: 'user',
    Manager: 'manager'
} as const;

export type UserRequestRoleEnum = typeof UserRequestRoleEnum[keyof typeof UserRequestRoleEnum];

/**
 * 
 * @export
 * @interface UserResponse
 */
export interface UserResponse {
    /**
     * 
     * @type {number}
     * @memberof UserResponse
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    'username'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    'firstName'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    'lastName'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    'email'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    'status'?: UserResponseStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    'role'?: UserResponseRoleEnum;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    'createdAt'?: string;
    /**
     * 
     * @type {string}
     * @memberof UserResponse
     */
    'updatedAt'?: string;
}

export const UserResponseStatusEnum = {
    Active: 'active',
    Inactive: 'inactive'
} as const;

export type UserResponseStatusEnum = typeof UserResponseStatusEnum[keyof typeof UserResponseStatusEnum];
export const UserResponseRoleEnum = {
    Admin: 'admin',
    User: 'user',
    Manager: 'manager'
} as const;

export type UserResponseRoleEnum = typeof UserResponseRoleEnum[keyof typeof UserResponseRoleEnum];


/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get auth token
         * @param {LoginUserRequest} loginUserRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authPost: async (loginUserRequest: LoginUserRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'loginUserRequest' is not null or undefined
            assertParamExists('authPost', 'loginUserRequest', loginUserRequest)
            const localVarPath = `/auth`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(loginUserRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get a list of users
         * @param {number} [offset] Page number of the users list
         * @param {number} [limit] Number of users per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersGet: async (offset?: number, limit?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (offset !== undefined) {
                localVarQueryParameter['offset'] = offset;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Create a new user
         * @param {UserRequest} userRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersPost: async (userRequest: UserRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userRequest' is not null or undefined
            assertParamExists('usersPost', 'userRequest', userRequest)
            const localVarPath = `/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(userRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete a user
         * @param {number} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersUserIdDelete: async (userId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            assertParamExists('usersUserIdDelete', 'userId', userId)
            const localVarPath = `/users/{userId}`
                .replace(`{${"userId"}}`, encodeURIComponent(String(userId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get a user by ID
         * @param {number} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersUserIdGet: async (userId: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            assertParamExists('usersUserIdGet', 'userId', userId)
            const localVarPath = `/users/{userId}`
                .replace(`{${"userId"}}`, encodeURIComponent(String(userId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Update a user
         * @param {number} userId 
         * @param {UserRequest} userRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersUserIdPut: async (userId: number, userRequest: UserRequest, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userId' is not null or undefined
            assertParamExists('usersUserIdPut', 'userId', userId)
            // verify required parameter 'userRequest' is not null or undefined
            assertParamExists('usersUserIdPut', 'userRequest', userRequest)
            const localVarPath = `/users/{userId}`
                .replace(`{${"userId"}}`, encodeURIComponent(String(userId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(userRequest, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Get auth token
         * @param {LoginUserRequest} loginUserRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async authPost(loginUserRequest: LoginUserRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.authPost(loginUserRequest, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['DefaultApi.authPost']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @summary Get a list of users
         * @param {number} [offset] Page number of the users list
         * @param {number} [limit] Number of users per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async usersGet(offset?: number, limit?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<MultiUsersResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.usersGet(offset, limit, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['DefaultApi.usersGet']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @summary Create a new user
         * @param {UserRequest} userRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async usersPost(userRequest: UserRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SingleUserResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.usersPost(userRequest, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['DefaultApi.usersPost']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @summary Delete a user
         * @param {number} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async usersUserIdDelete(userId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.usersUserIdDelete(userId, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['DefaultApi.usersUserIdDelete']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @summary Get a user by ID
         * @param {number} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async usersUserIdGet(userId: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SingleUserResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.usersUserIdGet(userId, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['DefaultApi.usersUserIdGet']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
        /**
         * 
         * @summary Update a user
         * @param {number} userId 
         * @param {UserRequest} userRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async usersUserIdPut(userId: number, userRequest: UserRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApiResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.usersUserIdPut(userId, userRequest, options);
            const index = configuration?.serverIndex ?? 0;
            const operationBasePath = operationServerMap['DefaultApi.usersUserIdPut']?.[index]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, operationBasePath || basePath);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * 
         * @summary Get auth token
         * @param {LoginUserRequest} loginUserRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        authPost(loginUserRequest: LoginUserRequest, options?: any): AxiosPromise<void> {
            return localVarFp.authPost(loginUserRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get a list of users
         * @param {number} [offset] Page number of the users list
         * @param {number} [limit] Number of users per page
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersGet(offset?: number, limit?: number, options?: any): AxiosPromise<MultiUsersResponse> {
            return localVarFp.usersGet(offset, limit, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Create a new user
         * @param {UserRequest} userRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersPost(userRequest: UserRequest, options?: any): AxiosPromise<SingleUserResponse> {
            return localVarFp.usersPost(userRequest, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete a user
         * @param {number} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersUserIdDelete(userId: number, options?: any): AxiosPromise<ApiResponse> {
            return localVarFp.usersUserIdDelete(userId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get a user by ID
         * @param {number} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersUserIdGet(userId: number, options?: any): AxiosPromise<SingleUserResponse> {
            return localVarFp.usersUserIdGet(userId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Update a user
         * @param {number} userId 
         * @param {UserRequest} userRequest 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        usersUserIdPut(userId: number, userRequest: UserRequest, options?: any): AxiosPromise<ApiResponse> {
            return localVarFp.usersUserIdPut(userId, userRequest, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @summary Get auth token
     * @param {LoginUserRequest} loginUserRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public authPost(loginUserRequest: LoginUserRequest, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).authPost(loginUserRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get a list of users
     * @param {number} [offset] Page number of the users list
     * @param {number} [limit] Number of users per page
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public usersGet(offset?: number, limit?: number, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).usersGet(offset, limit, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Create a new user
     * @param {UserRequest} userRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public usersPost(userRequest: UserRequest, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).usersPost(userRequest, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete a user
     * @param {number} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public usersUserIdDelete(userId: number, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).usersUserIdDelete(userId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get a user by ID
     * @param {number} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public usersUserIdGet(userId: number, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).usersUserIdGet(userId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Update a user
     * @param {number} userId 
     * @param {UserRequest} userRequest 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public usersUserIdPut(userId: number, userRequest: UserRequest, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).usersUserIdPut(userId, userRequest, options).then((request) => request(this.axios, this.basePath));
    }
}



