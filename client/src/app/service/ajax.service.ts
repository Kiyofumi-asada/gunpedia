import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TPartialGundamData } from '../types/types';

@Injectable()
export class AjaxService {
  private _httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    observe: 'response',
    body: null,
  };
  isLocal = environment.local;
  host: string = environment.host;
  apiPath = {
    org: '/api/gundam',
  } as const;
  apiUrl: string = `${this.host}${this.apiPath.org}`;

  constructor(private http: HttpClient) {
    this.setAuthorization('my-auth-token');
    console.log('isLocal', this.isLocal);
  }

  setAuthorization(token: string = ''): void {
    if (!token) {
      return;
    }
    const bearerToken: string = `Bearer ${token}`;
    this._httpOptions.headers = this._httpOptions.headers.set(
      'Authorization',
      bearerToken
    );
  }

  /**
   * 一覧取得
   * @returns
   */
  public getList(): Promise<TPartialGundamData[]> {
    return this.http
      .get(this.apiUrl, this._httpOptions)
      .toPromise()
      .then((res) => {
        const resData: any = res;
        return resData;
      })
      .catch(this.errorHandler);
  }
  errorHandler(err: any) {
    console.log(err);
    return Promise.reject(err.message || err);
  }

  /**
   * 詳細取得
   * @param detailId
   * @returns
   */
  getDetailData(detailId: number): Promise<TPartialGundamData> {
    const detailPath = `${this.apiUrl}/${detailId}`;
    return this.http
      .get(detailPath, this._httpOptions)
      .toPromise()
      .then((res) => {
        const resData: any = res;
        return resData;
      })
      .catch(this.errorHandler);
  }

  /**
   * データ新規作成
   * @param body
   * @returns
   */
  registerData(body: TPartialGundamData): Observable<ArrayBuffer> {
    return this.http.post(this.apiUrl, body, this._httpOptions);
  }

  /**
   * データ更新
   * @param body
   * @returns
   */
  updateData(body: TPartialGundamData): Observable<ArrayBuffer> {
    return this.http.put(this.apiUrl, body, this._httpOptions);
  }

  /**
   * データ削除
   * @param detailId
   * @returns
   */
  deleteData(detailId: number): Observable<ArrayBuffer> {
    const detailPath = `${this.apiUrl}/${detailId}`;
    return this.http.delete(detailPath, this._httpOptions);
  }
}
