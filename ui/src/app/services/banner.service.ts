import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Banner, CreateBannerDto, UpdateBannerDto } from '../models/banner.model';

const API_URL = `${environment.backendApiUrl}/banners`;

@Injectable({ providedIn: 'root' })
export class BannerService {
  private readonly http = inject(HttpClient);

  getBanners(): Observable<Banner[]> {
    return this.http.get<Banner[]>(API_URL);
  }

  getBannerById(id: number): Observable<Banner> {
    return this.http.get<Banner>(`${API_URL}/${id}`);
  }

  createBanner(dto: CreateBannerDto): Observable<Banner> {
    return this.http.post<Banner>(API_URL, dto);
  }

  updateBanner(id: number, dto: UpdateBannerDto): Observable<void> {
    return this.http.put<void>(`${API_URL}/${id}`, dto);
  }

  deleteBanner(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
