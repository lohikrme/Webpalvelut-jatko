import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrl: './greeting.component.css'
})

// try propery binding by creating a simple title
export class GreetingComponent {
  @Input() title: string;
  clickCounter = 0;
  constructor() {
    this.title = "Zhonghua Yingwu";
  }
  onClickHandler() {
    this.clickCounter++;
    console.log(`onClickHandler called ${this.clickCounter}!`);
  }
}
