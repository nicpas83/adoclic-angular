import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface JokeResponse {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  private apiUrl: string = 'https://official-joke-api.appspot.com/random_joke';

  constructor(private http: HttpClient) {}

  getRandomJoke(): Observable<JokeResponse> {
    return this.http.get<JokeResponse>(this.apiUrl);
  }
}
