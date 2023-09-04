import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('pageNumber', [
      state('one', style({
        transform: 'translateX(-0%)',
      })),
      state('two', style({
        transform: 'translateX(-33.3%)',
      })),
      state('three', style({
        transform: 'translateX(-66.6%)',
      })),
      transition('* <=> *', [
        animate('500ms')
      ])
    ])
  ]
})
export class AppComponent {

  title = 'pomodoro timer'
  pageNumber = 'one'
  workDuration: number = 25
  breakDuration: number = 5
  intervalWork: any
  intervalBreak: any
  countDownWork = 0
  countDownBreak = 0
  minutes = 0
  seconds = 0
  message = "Agora é só começar"
  intervalActive: boolean = false

  toggle(pageNumber: string) {
    this.pageNumber = pageNumber;
  }

  increaseFocusTime() {
    this.workDuration += 1
    this.minutes = this.workDuration
  }

  decreaseFocusTime() {
    if (this.workDuration == 25) {
      this.workDuration = 25
    } else {
      this.workDuration -= 1
      this.minutes = this.workDuration - 1
    }
  }

  increaseBreakTime() {
    this.breakDuration += 1
  }

  decreaseBreakTime() {
    if (this.breakDuration == 5) {
      this.breakDuration = 5
    } else {
      this.breakDuration -= 1
    }
  }

  load() {
    location.reload()
  }

  startWorkTime() {
    this.message = "Bons estudos"
    this.intervalActive = true
    this.countDownWork = (this.workDuration) * 60
    this.minutes = Math.floor(this.countDownWork / 60)
    this.seconds = this.countDownWork % 60
    this.intervalWork = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--
      }
      else if (this.minutes > 0) {
        this.seconds = 59
        this.minutes--
      } else {
        clearInterval(this.intervalWork)
        return this.startRestTime()
      }
    }, 1000)
  }

  startRestTime() {
    this.message = "Descansa um pouquinho"
    this.countDownBreak = (this.breakDuration) * 60
    this.minutes = Math.floor(this.countDownBreak / 60)
    this.seconds = (this.countDownBreak % 60)
    this.intervalBreak = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--
      }
      else if (this.minutes > 0) {
        this.seconds = 59
        this.minutes--
      } else {
        clearInterval(this.intervalBreak)
        alert("Acabou o tempo")
        this.message = "Agora é só começar"
        this.minutes = 0
        this.seconds = 0
      }
    }, 1000)
  }

  stopBothTimers() {
    clearInterval(this.intervalWork)
    clearInterval(this.intervalBreak)
    this.intervalActive = false
    this.message = "Agora é só começar"
    this.minutes = 0
    this.seconds = 0
    this.pageNumber = "one"
  }
}