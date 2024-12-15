import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '~environments/environment';
import { CACHING_ENABLED } from '~core/interceptors/caching.interceptor';
import type {
  GetMeResponse,
  GetMeResponseData,
} from '~features/authentication/types/get-me-response.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);

  private readonly apiUrl = environment.apiBaseUrl;

  getMe(): Observable<GetMeResponseData> {
    const getMeEndpoint = `${this.apiUrl}/v1/user`;
    return this.httpClient
      .get<GetMeResponse>(getMeEndpoint, {
        context: new HttpContext().set(CACHING_ENABLED, true),
        withCredentials: true,
      })
      .pipe(
        map((response: GetMeResponse) => {
          const { data } = response;
          return data;
        }),
      );
  }
}
