import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ApiService} from "../services/api.service";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-table',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Angular13Crud';
  displayedColumns: string[] = ['DriverName', 'TourNumber', 'StarTime', 'FinishingTime', 'DeliveredBox', 'truckBrand','date', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private dialog : MatDialog, private api : ApiService) {
  }

  ngOnInit(): void {
    this.getAllTrucks();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if (val === 'save'){
        this.getAllTrucks();
      }
    })
  }
  getAllTrucks(){
    this.api.getTruck()
      .subscribe({
        next:(res)=>{
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        },
        error:(err)=>{
          alert("Error while fetching the Records !!")
        }
      })
  }

  editTruck(row : any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if (val === 'update'){
        this.getAllTrucks();
      }
    })
    console.log(row)
  }
  deleteTruck(id:number){
    this.api.deleteTruck(id)
      .subscribe({
        next:(res)=>{
          alert("Truck Deleted Successfully")
          this.getAllTrucks();
        },
        error:()=>{
          alert("Error while deleting the truck!!")
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}
