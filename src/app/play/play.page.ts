import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import preguntasData from '../../assets/preguntas.json';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {
  preguntas: any[] = [];
  respuestas: string[] = [];
  currentQuestionIndex: number = 0;
  timer: any;
  minutes: number = 5;
  seconds: number = 0;
  score: number = 0;
  showResults: boolean = false;
  resultIndex: number = 0;
  roomId: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.roomId = localStorage.getItem('roomId') || '';
    this.limpiarEstadoJuego();
    this.iniciarQuiz();
  }

  limpiarEstadoJuego() {
    localStorage.removeItem('gameState');
    this.respuestas = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.minutes = 5;
    this.seconds = 0;
    this.showResults = false;
    this.resultIndex = 0;
  }

  iniciarQuiz() {
    const gameState = JSON.parse(localStorage.getItem('gameState') || '{}');
    this.preguntas = this.seleccionarPreguntasAleatorias(preguntasData.questions, 10);
    this.respuestas = gameState.respuestas || [];
    this.currentQuestionIndex = gameState.currentQuestionIndex || 0;
    this.score = gameState.score || 0;
    this.minutes = gameState.minutes || 5;
    this.seconds = gameState.seconds || 0;
    this.iniciarTemporizador();
  }

  seleccionarPreguntasAleatorias(preguntas: any[], cantidad: number): any[] {
    return preguntas.sort(() => 0.5 - Math.random()).slice(0, cantidad);
  }

  iniciarTemporizador() {
    this.timer = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          clearInterval(this.timer);
          this.submitQuiz();
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
      this.guardarEstadoJuego();
    }, 1000);
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.preguntas.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.submitQuiz();
    }
    this.guardarEstadoJuego();
  }

  submitQuiz() {
    this.calcularPuntuacion();
    console.log('Quiz enviado', this.respuestas);
    this.currentQuestionIndex = this.preguntas.length; // Asegúrate de que se muestre la sección de resultados
    this.guardarEstadoJuego();
  }

  calcularPuntuacion() {
    // Implementación para calcular la puntuación
  }

  guardarEstadoJuego() {
    const gameState = {
      respuestas: this.respuestas,
      currentQuestionIndex: this.currentQuestionIndex,
      score: this.score,
      minutes: this.minutes,
      seconds: this.seconds
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }

  verPuntuacion() {
    this.showResults = true;
  }

  nextResult() {
    if (this.resultIndex < this.preguntas.length - 1) {
      this.resultIndex++;
    }
  }

  prevResult() {
    if (this.resultIndex > 0) {
      this.resultIndex--;
    }
  }

  volverSala() {
    this.limpiarEstadoJuego();
    this.router.navigate([`/create-room/${this.roomId}`]);
  }

  salirHome() {
    this.router.navigate(['/home']);
  }
}