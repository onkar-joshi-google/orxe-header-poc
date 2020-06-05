import { Component, OnInit } from '@angular/core';
import { OrxeHeader } from 'orxe-header/src';

@Component({
  selector: 'app-cbtest',
  templateUrl: './cbtest.component.html',
  styleUrls: ['./cbtest.component.scss']
})
export class CbtestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    OrxeHeader.leftIconListener().subscribe((response) => {
      console.log("Catched!");
    })
  }

}
