import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DogImageResponse {
  message: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiUrl: string = 'https://dog.ceo/api/breeds/image/random';

  constructor(private http: HttpClient) {}

  getRandomDogImage(): Observable<DogImageResponse> {
    return this.http.get<DogImageResponse>(this.apiUrl);
  }
}
