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
  workDuration = 25
  breakDuration = 5
  intervalWork: any = 0
  intervalBreak: any = 0
  countDownWork = 0
  countDownBreak = 0
  minutes = 0
  seconds = 0
  message = "get to work"

  toggle(pageNumber: string) {
    this.pageNumber = pageNumber;
  }

  increaseFocusTime() {
    this.workDuration += 1
    this.minutes = this.workDuration 
  }

  decreaseFocusTime() {
    if(this.workDuration == 25) {
      this.workDuration = 25
    } else {
      this.workDuration -= 1
      this.minutes = this.workDuration -1
    }
  }

  increaseBreakTime() {
    this.breakDuration += 1
  }

  decreaseBreakTime() {
    if(this.breakDuration == 5){
      this.breakDuration = 5
    } else{  
      this.breakDuration -= 1
    }
  }

  load() {
    location.reload()
  }
  startWorkTime() {
    this.countDownWork = (this.workDuration)*60
    this.minutes = Math.floor(this.countDownWork/60)
    this.seconds = (this.countDownWork % 60)
    this.intervalWork = setInterval(() => workCounter(), 1000)
    const workCounter = () => {
      if (this.seconds === 0){
        this.seconds = 60
        this.minutes--
      }
      this.seconds--
      if (this.minutes < 0) {
        this.minutes = 0
        this.seconds = 60
        clearInterval(this.intervalWork)
        return this.startRestTime()
      }
      console.log("work - duration "+this.workDuration)
      console.log("work - contador em segundos"+this.countDownWork)
      console.log("work - minutos "+this.minutes)
      console.log("work - segundos"+this.seconds)
  }
}

  startRestTime() {
    this.message = "get some rest"
    this.countDownBreak = (this.breakDuration)*60
    this.minutes = Math.floor(this.countDownBreak/60)
    this.seconds = (this.countDownBreak % 60)
    this.intervalBreak = setInterval(() => restCounter(), 1000)
    const restCounter = () => {
      if (this.seconds === 0){
        this.seconds = 60
        this.minutes--
      }
      this.seconds--
      if (this.minutes < 0 ){
        clearInterval(this.intervalBreak)
        alert("your pomodoro timer is done")
        this.message = "get to work"
        this.minutes = 0
        this.seconds = 0
      }
    }
    console.log("rest - duration "+this.breakDuration)
    console.log("rest - contador em segundos "+this.countDownBreak)
    console.log("rest - minutos "+this.minutes)
    console.log("rest - segundos "+this.seconds)
  }
}