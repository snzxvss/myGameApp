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
      this.loadCommentsFromLocalStorage();
    });
  }

  toggleExpand(index: number) {
    this.expandedCaseIndex = this.expandedCaseIndex === index ? null : index;
  }

  addComment(index: number) {
    if (this.newComment.trim()) {
      this.casos[index].COMENTARIO += this.casos[index].COMENTARIO ? `; ${this.newComment}` : this.newComment;
      this.saveCommentsToLocalStorage();
      this.newComment = '';
    }
  }

  saveCommentsToLocalStorage() {
    localStorage.setItem('casos', JSON.stringify(this.casos));
  }

  loadCommentsFromLocalStorage() {
    const savedCasos = localStorage.getItem('casos');
    if (savedCasos) {
      this.casos = JSON.parse(savedCasos);
    }
  }

  goBack() {
    this.expandedCaseIndex = null;
  }

  formatDescription(description: string): string {
    // Reemplaza los saltos de línea por etiquetas <br> y otros formatos necesarios
    return description
      .replace(/Paciente de (\d+) años de edad\./g, '<strong>Paciente de $1 años de edad.</strong>')
      .replace(/Ocupación:/g, '<strong>Ocupación:</strong>')
      .replace(/M\.C\./g, '<strong>M.C.</strong>')
      .replace(/A\.P\./g, '<strong>A.P.</strong>')
      .replace(/A\.O\./g, '<strong>A.O.</strong>')
      .replace(/DATOS CLÍNICOS:/g, '<strong>DATOS CLÍNICOS:</strong>')
      .replace(/AMPLITUD DE ACOMODACIÓN/g, '<strong>AMPLITUD DE ACOMODACIÓN</strong>')
      .replace(/FLEXIBILIDAD DE ACC/g, '<strong>FLEXIBILIDAD DE ACC</strong>')
      .replace(/HALLE:/g, '<strong>HALLE:</strong>')
      .replace(/\n/g, '<br>');
  }
}