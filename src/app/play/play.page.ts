import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import preguntasData from '../../preguntas.json';

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

  constructor(private router: Router) {}

  ngOnInit() {
    this.iniciarQuiz();
    this.iniciarTemporizador();
  }

  iniciarQuiz() {
    const gameState = JSON.parse(localStorage.getItem('gameState') || '{}');
    this.preguntas = this.seleccionarPreguntasAleatorias(preguntasData.questions, 10);
    this.respuestas = gameState.respuestas || [];
    this.currentQuestionIndex = gameState.currentQuestionIndex || 0;
    this.score = gameState.score || 0;
    this.minutes = gameState.minutes || 5;
    this.seconds = gameState.seconds || 0;
  }

  seleccionarPreguntasAleatorias(preguntas: any[], cantidad: number): any[] {
    const preguntasAleatorias = [];
    const indicesSeleccionados = new Set<number>();
    while (preguntasAleatorias.length < cantidad) {
      const indice = Math.floor(Math.random() * preguntas.length);
      if (!indicesSeleccionados.has(indice)) {
        indicesSeleccionados.add(indice);
        preguntasAleatorias.push(preguntas[indice]);
      }
    }
    return preguntasAleatorias;
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
    this.score = this.preguntas.reduce((acc, pregunta, index) => {
      return acc + (pregunta.answer === this.respuestas[index] ? 1 : 0);
    }, 0);
  }

  guardarEstadoJuego() {
    localStorage.setItem('gameState', JSON.stringify({
      preguntas: this.preguntas,
      respuestas: this.respuestas,
      currentQuestionIndex: this.currentQuestionIndex,
      score: this.score,
      minutes: this.minutes,
      seconds: this.seconds
    }));
  }

  volverSala() {
    // Limpiar el estado del juego
    localStorage.removeItem('gameState');
    this.router.navigate(['/create-room']);
  }

  salirHome() {
    this.router.navigate(['/home']);
  }
}