import { Component, OnInit } from '@angular/core';
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if (val === 'save'){
      }
    })
  }
  constructor(private dialog : MatDialog, private api : ApiService) { }

  ngOnInit(): void {
  }

}
