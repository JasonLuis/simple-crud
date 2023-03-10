import axios from 'axios';
import { getCompanyAcronym } from '~/app/core/base/companyAcronym';
import { getCompId } from '~/app/core/base/compId';
import { getStoreAcronym } from '~/app/core/base/storeAcronym';

interface GetParams {
  url: string;
  queryString?: string;
  headers?: object;
  options?: object;
  path?: any;
}

interface PostParams {
  url?: string;
  queryString?: string;
  headers?: object;
  options?: object;
  body?: any;
  path?: any;
}

export interface IHttpAdapter {
  get(p: GetParams): Promise<any>;
  post(p: PostParams): Promise<any>;
  request(p: any): Promise<any>;
  put(p: PostParams): Promise<any>;
  patch(p?: PostParams): Promise<any>;
  delete(p?: PostParams): Promise<any>;
}

export class HttpAdapter implements IHttpAdapter {
  private baseUrl: string | undefined;
  private initialHeaders: object;

  constructor(baseUrl?: string, initialHeaders?: object) {
    this.baseUrl = baseUrl ?? undefined;
    this.initialHeaders = initialHeaders || {};
  }

  put(p: PostParams): Promise<any> {
    const qs = p.queryString ? `?${p.queryString}` : '';
    const urlCall = this.baseUrl
      ? `${this.baseUrl}${p.path}${qs}`
      : `${p.url}${qs}`;
    let headers = { ...this.initialHeaders, ...p.headers };

    if (getCompanyAcronym()) {
      headers = { ...headers, CompanyAcronym: getCompanyAcronym() };
    }
    if (getStoreAcronym()) {
      headers = { ...headers, StoreAcronym: getStoreAcronym() };
    }
    if (getCompId()) {
      headers = { ...headers, CompId: getCompId() };
    }

    return axios.put(urlCall, p.body, {
      headers,
      timeout: 300000,
      ...p.options
    });
  }

  post(p: PostParams): Promise<any> {
    const qs = p.queryString ? `?${p.queryString}` : '';
    const urlCall = this.baseUrl
      ? `${this.baseUrl}${p.path}${qs}`
      : `${p.url}${qs}`;
    let headers = { ...this.initialHeaders, ...p.headers };

    if (getCompanyAcronym()) {
      headers = { ...headers, CompanyAcronym: getCompanyAcronym() };
    }

    if (getStoreAcronym()) {
      headers = { ...headers, StoreAcronym: getStoreAcronym() };
    }
    if (getCompId()) {
      headers = { ...headers, CompId: getCompId() };
    }

    return axios.post(urlCall, p.body, {
      headers,
      timeout: 300000,
      ...p.options
    });
  }

  get(p: GetParams): Promise<any> {
    const qs = p.queryString ? `?${p.queryString}` : '';
    const urlCall = this.baseUrl
      ? `${this.baseUrl}${p.path}${qs}`
      : `${p.url}${qs}`;
    const headers = { ...this.initialHeaders, ...p.headers };
    return axios.get(urlCall, { headers, ...p.options });
  }

  request(p: any): Promise<any> {
    return axios.request(p);
  }

  delete(p: PostParams): Promise<any> {
    const qs = p.queryString ? `?${p.queryString}` : '';
    const urlCall = this.baseUrl
      ? `${this.baseUrl}${p.path}${qs}`
      : `${p.url}${qs}`;
    let headers = { ...this.initialHeaders, ...p.headers };

    if (getCompanyAcronym()) {
      headers = { ...headers, CompanyAcronym: getCompanyAcronym() };
    }

    if (getStoreAcronym()) {
      headers = { ...headers, StoreAcronym: getStoreAcronym() };
    }
    if (getCompId()) {
      headers = { ...headers, CompId: getCompId() };
    }

    return axios.delete(urlCall, {
      data: p.body,
      headers,
      timeout: 300000,
      ...p.options
    });
  }

  patch(p: PostParams): Promise<any> {
    const qs = p.queryString ? `?${p.queryString}` : '';
    const urlCall = this.baseUrl
      ? `${this.baseUrl}${p.path}${qs}`
      : `${p.url}${qs}`;
    let headers = { ...this.initialHeaders, ...p.headers };

    if (getCompanyAcronym()) {
      headers = { ...headers, CompanyAcronym: getCompanyAcronym() };
    }

    if (getStoreAcronym()) {
      headers = { ...headers, StoreAcronym: getStoreAcronym() };
    }
    if (getCompId()) {
      headers = { ...headers, CompId: getCompId() };
    }

    return axios.patch(urlCall, p.body, {
      headers,
      timeout: 300000,
      ...p.options
    });
  }

  // delete(p: PostParams): Promise<any> {
  //   const qs = p.queryString ? `?${p.queryString}` : '';
  //   const urlCall = this.baseUrl
  //     ? `${this.baseUrl}${p.path}${qs}`
  //     : `${p.url}${qs}`;
  //   let headers = { ...this.initialHeaders, ...p.headers };
  //   if (getCompanyAcronym()) {
  //     headers = { ...headers, CompanyAcronym: getCompanyAcronym() };
  //   }
  //   return axios.delete(urlCall, {
  //     data: p.body,
  //     headers,
  //     timeout: 300000,
  //     ...p.options,
  //   });
  // }

  // patch(p: PostParams): Promise<any> {
  //   const qs = p.queryString ? `?${p.queryString}` : '';
  //   const urlCall = this.baseUrl
  //     ? `${this.baseUrl}${p.path}${qs}`
  //     : `${p.url}${qs}`;
  //   let headers = { ...this.initialHeaders, ...p.headers };
  //   if (getCompanyAcronym()) {
  //     headers = { ...headers, CompanyAcronym: getCompanyAcronym() };
  //   }
  //   if (getStoreAcronym()) {
  //     headers = { ...headers, StoreAcronym: getStoreAcronym() };
  //   }
  //   if (getCompId()) {
  //     headers = { ...headers, CompId: getCompId() };
  //   }
  //   return axios.patch(urlCall, p.body, {
  //     headers,
  //     timeout: 300000,
  //     ...p.options,
  //   });
  // }
}
