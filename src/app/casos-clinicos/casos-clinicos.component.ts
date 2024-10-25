import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-casos-clinicos',
  templateUrl: './casos-clinicos.component.html',
  styleUrls: ['./casos-clinicos.component.scss'],
})
export class CasosClinicosComponent implements OnInit {
  casos: any[] = [];
  expandedCaseIndex: number | null = null;
  newComment: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ [key: string]: any }>('assets/casos.json').subscribe(data => {
      this.casos = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    });
  }

  toggleExpand(index: number) {
    this.expandedCaseIndex = this.expandedCaseIndex === index ? null : index;
  }

  addComment(index: number) {
    if (this.newComment.trim()) {
      this.casos[index].COMENTARIO += this.casos[index].COMENTARIO ? `; ${this.newComment}` : this.newComment;
      this.newComment = '';
    }
  }
}