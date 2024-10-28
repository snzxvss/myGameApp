import { Component, OnInit } from '@angular/core';

interface Caso {
  id: string;
  descripcion: string;
  comentario: string;
  'A.PERSONALES'?: any;
  ANTECEDENTES_FAMILIARES?: any;
  DATOS_CLINICOS?: any;
  REFRACCION?: any;
  AA?: any;
  FLEXIBILIDAD_DE_ACC?: any;
  HALLE?: any;
}

@Component({
  selector: 'app-casos-clinicos',
  templateUrl: './casos-clinicos.component.html',
  styleUrls: ['./casos-clinicos.component.scss'],
})
export class CasosClinicosComponent implements OnInit {
  casos: Caso[] = [
    {
      id: 'CASO 1',
      descripcion: `Paciente de 13 años de edad.

Ocupación: estudiante de 8º básica media
M.C. Paciente asiste a consulta de Optometría, por presentar fatiga visual al trabajo excesivo frente al computador. Ardor ocular y ojos rojos. Cefalea. Evolución: 2 meses aproximadamente. Manifiesta que los síntomas habían aparecido hace más tiempo, pero ahora se han hecho más frecuentes.

A.PERSONALES:
GENERALES: 
Cirugía de hernia umbilical, a los 9 años de edad.
Fractura de segundo dedo del pie derecho, hace 2 años.
Rinitis alérgica, sin tratamiento farmacológico.

ANTECEDENTES OCULARES: Último control visual: 1 año. Le prescribieron corrección óptica, pero no las usa en la forma recomendada.
ANTECEDENTES FAMILIARES:
Línea materna: madre hipertensión arterial. Abuela: hipertensión arterial; muerte por ACV
Línea paterna: Padre y tíos paternos: astigmatismo y anisometropía

DATOS CLÍNICOS:
AV VL SC DT: 2 metros    
Test: Optotipo aritmético diseñado a 3 metros
OD 20/40  PH 20/25
OI 20/25

AV VP SC ODI: 0.75M

Teniendo en cuenta, la disminución de la AV del paciente, se realizó examen de refracción:
OD +0.25-0.75*15º AV 20/20
OI +0.50 -0.50*0º AV 20/20
AA Técnica: Sheard DT: 40 cm
ODI: Reporta visión borrosa con un lente de 
-9.25 dioptrías

FLEXIBILIDAD DE ACC Técnica: Flippers
ODI +2.00 / -3.00  4cpm

HALLE:
AV real del paciente en cada ojo
Calcule la AA del paciente, de acuerdo a la ecuación mínima de Hofstetter.
Calcule la AA obtenida con el método de Sheard, en este paciente
Diagnóstico acomodativo
      `,
      comentario: ''
    },
    {
      id: 'CASO 2',
      descripcion: `Paciente femenino de 26 años de edad.

Ocupación: diseñadora gráfica
M.C Paciente asiste a consulta de Optometría, por presentar visión borrosa al realizar actividades de forma prolongada frente al computador. Cefalea. Evolución: hace 3 meses se acentuaron los síntomas.

DATOS CLÍNICOS:
AV VL SC OD 20/20 OI 20/20
AV VP SC OD 1M OI 0.75M
RETINOSCOPÍA DINÁMICA
OD: +0.50 Esférico AV 20/20
OI: +0.75 esférico AV 20/20
AMPLITUD DE ACOMODACIÓN
Técnica: Sheard DT: 40 cm
ODI: Reporta visión borrosa con lente de 
-3.50 dioptrías
Técnica: Donders
ODI: Reporta visión borrosa a 25 cms

FLEXIBILIDAD DE ACOMODACIÓN
Técnica: Flippers
OD +2.00/-1.00  4 cpm
OI +2.00 / -1.00 3 cpm

HALLE:
El valor de la AA de cada ojo
El valor de AA esperado de acuerdo con la ecuación de AA mínima de Hofstetter
Emita diagnóstico acomodativo, teniendo en cuenta los datos clínicos.
      `,
      comentario: ''
    },
    {
      id: 'CASO 3',
      descripcion: `Paciente de 10 años de edad.

Ocupación: estudiante de 5to grado básica primaria
M.C: Paciente asiste por control visual. Además su cuidadora reporta que nuevamente está presentando cefalea, cansancio y mala visión de lejos.

A.P. Tratamiento con servicio de Psicología, para manejo del estrés.
A.O. Asistió a Terapia visual hace 6 meses. UCV: 6 meses. NO le prescribieron corrección óptica.

AV VL SC ODI: 20/30
AV VP SC ODI: 0.50M

AMPLITUD DE ACOMODACIÓN
Técnica: Sheard DT: 40 cm
ODI: Reporta visión borrosa con lente de 
-10.00 dioptrías

FLEXIBILIDAD DE ACC
Técnica: Flippers
ODI: +1.00 / -2.00 2 cpm

HALLE:
El valor de la AA de cada ojo
El valor de AA esperado de acuerdo con la ecuación de AA mínima de Hofstetter
Emita diagnóstico acomodativo, teniendo en cuenta los datos clínicos.
      `,
      comentario: ''
    },
    {
      id: 'CASO 4',
      descripcion: `Paciente de 32 años de edad.

Ocupación: secretaria
M.C: Paciente con cuadro clínico de astenopia, visión borrosa al realizar actividades en visión cercana. Además reporta que después de haber trabajado en el computador por largo tiempo, debe parpadear muchas veces para poder ver a distancia, o después de atender a un usuario y luego intentar escribir en el computador, también debe parpadear. Evolución: 6 meses aproximadamente.

AMPLITUD DE ACOMODACIÓN
Técnica: Sheard DT: 33 cm
ODI: Reporta visión borrosa con lente de -1.75 dioptrías

FLEXIBILIDAD DE ACC
Técnica: Flippers
ODI: +1.00 / -1.00 2 cpm

HALLE:
El valor de la AA de cada ojo
El valor de AA esperado de acuerdo con la ecuación de AA mínima de Hofstetter
Emita diagnóstico acomodativo, teniendo en cuenta los datos clínicos.
      `,
      comentario: ''
    }
];
  
  expandedCaseIndex: number | null = null;
  newComment: string = '';

  ngOnInit() {
    this.loadCommentsFromLocalStorage();
  }

  toggleExpand(index: number) {
    this.expandedCaseIndex = this.expandedCaseIndex === index ? null : index;
  }

  addComment(index: number) {
    if (this.newComment.trim()) {
      this.casos[index].comentario += this.casos[index].comentario ? `; ${this.newComment}` : this.newComment;
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
    return description
      .replace(/Paciente de (\d+) años de edad\./g, '<strong>Paciente de $1 años de edad.</strong><br><br>')
      .replace(/Ocupación:/g, '<strong>Ocupación:</strong><br><br>')
      .replace(/M\.C\./g, '<strong>M.C.</strong><br><br>')
      .replace(/A\.P\./g, '<strong>A.P.</strong><br><br>')
      .replace(/DATOS CLÍNICOS:/g, '<strong>DATOS CLÍNICOS:</strong><br><br>')
      .replace(/AMPLITUD DE ACOMODACIÓN/g, '<strong>AMPLITUD DE ACOMODACIÓN</strong><br><br>')
      .replace(/FLEXIBILIDAD DE ACC/g, '<strong>FLEXIBILIDAD DE ACC</strong><br><br>')
      .replace(/HALLE:/g, '<strong>HALLE:</strong><br><br>')
      .replace(/\n/g, '<br>');
  }

  formatClinicalData(clinicalData: any): string {
    return Object.keys(clinicalData).map(key => {
      if (Array.isArray(clinicalData[key])) {
        if (key === 'HALLE') {
          return `<br><br><strong><u>${key}</u>:</strong><br>${clinicalData[key].join(' ')}<br><br>`;
        } else {
          return `<br><strong><u>${key}</u>:</strong><br>${clinicalData[key].map((item: string) => `- ${item}`).join('<br>')}<br><br>`;
        }
      } else {
        return `<br><strong><u>${key}</u>:</strong> ${clinicalData[key]}<br><br>`;
      }
    }).join('');
  }
}