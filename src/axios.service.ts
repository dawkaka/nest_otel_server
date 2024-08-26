import { Injectable } from '@nestjs/common';
import { observeAxios } from 'apitoolkit-express';
import axios from 'axios';

@Injectable()
export class AxiosService {
  private ax = observeAxios(axios);
  async get(url: string, config?: Record<string, any>) {
    try {
      const response = await this.ax.get(url, config);
      if (response?.data?.data) return Promise.resolve(response.data.data);
      if (response?.data?.responseBody)
        return Promise.resolve(response.data.responseBody);
      return Promise.resolve(response?.data);
    } catch (error) {
      if (error?.response?.data) return Promise.reject(error?.response?.data);
      return Promise.reject(error);
    }
  }
}
