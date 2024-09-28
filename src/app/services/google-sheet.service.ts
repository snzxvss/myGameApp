import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetService {
  private sheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/YOUR_SHEET_ID/values/YOUR_RANGE?key=YOUR_API_KEY';

  constructor(private http: HttpClient) {}

  getQuestions(): Observable<any> {
    return this.http.get(this.sheetUrl);
  }
}