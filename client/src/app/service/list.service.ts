import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ListService {
  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    observe: 'response',
    body: null,
  };
  isLocal = false;
  host: string = this.isLocal
    ? 'http://localhost:4200/app'
    : 'http://ec2-13-114-147-158.ap-northeast-1.compute.amazonaws.com';
  path: string = '/api/index';
  reqUrl: string = this.host + this.path;

  constructor(private http: HttpClient) {
    this.setAuthorization('my-auth-token');
  }

  setAuthorization(token: string = ''): void {
    if (!token) {
      return;
    }
    const bearerToken: string = `Bearer ${token}`;
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      bearerToken
    );
  }

  /**
   * 一覧取得
   * @returns
   */
  public getList(): Promise<any[]> {
    return this.http
      .get(this.reqUrl, this.httpOptions)
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
  getDetailData(detailId: number): Promise<any> {
    const detailPath = '/api/index/' + detailId;
    console.log('path', detailPath);
    return this.http
      .get(this.host + detailPath, this.httpOptions)
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
  registerData(body: any): Observable<any> {
    return this.http.post(this.reqUrl, body, this.httpOptions);
  }

  /**
   * データ更新
   * @param body
   * @returns
   */
  updateData(body: any): Observable<any> {
    return this.http.put(this.reqUrl, body, this.httpOptions);
  }
  /**
   * データ削除
   * @param detailId
   * @returns
   */
  deleteData(detailId: number): Observable<any> {
    return this.http.request('DELETE', this.reqUrl, { body: { id: detailId } });
  }
}
