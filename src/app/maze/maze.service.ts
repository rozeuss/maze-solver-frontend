import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Maze} from './maze';
import {Page} from '../page/page';

@Injectable({
  providedIn: 'root'
})
export class MazeService {

  private readonly mazesUrl: string;

  constructor(private http: HttpClient) {
    this.mazesUrl = 'http://localhost:8080/mazes';
  }

  public findAll(): Observable<Maze[]> {
    return this.http.get<Maze[]>(this.mazesUrl);
  }

  public findPaginated(page: number, size: number): Observable<Page<Maze>> {
    return this.http.get<Page<Maze>>(this.mazesUrl + `/pages?page=${page}&size=${size}`);
  }

  public upload(formData) {
    return this.http.post<any>(this.mazesUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}

