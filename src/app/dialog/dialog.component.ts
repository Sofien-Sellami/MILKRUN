import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validator, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {
  foods: Food[] = [
    {value: 'items data', viewValue: 'items data'},
    {value: 'items location', viewValue: 'items location'},
    {value: 'picking problems', viewValue: 'picking problems'},
  ];
  truckList = ["YES", "NO"]
  truckForm !: FormGroup;
  actionBtnTruck : string = "Save"

  constructor(private formBuilder : FormBuilder,
              private api : ApiService,
              @Inject(MAT_DIALOG_DATA) public editDataTruck : any,
              private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

    this.truckForm = this.formBuilder.group({
      DriverName : ['',Validators.required],
      TourNumber : ['',Validators.required],
      StarTime : ['',Validators.required],
      FinishingTime : ['',Validators.required],
      DeliveredBox : ['',Validators.required],
      truckBrand : ['',Validators.required],
      date : ['',Validators.required]
    })
    if (this.editDataTruck){
      this.actionBtnTruck="Update"
      this.truckForm.controls['DriverName'].setValue(this.editDataTruck.DriverName);
      this.truckForm.controls['TourNumber'].setValue(this.editDataTruck.TourNumber);
      this.truckForm.controls['StarTime'].setValue(this.editDataTruck.StarTime);
      this.truckForm.controls['FinishingTime'].setValue(this.editDataTruck.FinishingTime);
      this.truckForm.controls['DeliveredBox'].setValue(this.editDataTruck.DeliveredBox);
      this.truckForm.controls['truckBrand'].setValue(this.editDataTruck.truckBrand);
      this.truckForm.controls['date'].setValue(this.editDataTruck.date);
    }
  }
  addTruck(){
    if(!this.editDataTruck){
      if(this.truckForm.valid){
        this.api.postTruck(this.truckForm.value)
          .subscribe({
            next:(res)=>{
              alert("Truck added successfully")
              this.truckForm.reset();
              this.dialogRef.close('save');
            },
            error:()=>{
              alert("Error while adding the truck")
            }
          })

      }
    }
    else {
      this.updateTruck()
    }
  }
  updateTruck(){
    this.api.putTruck(this.truckForm.value,this.editDataTruck.id)
      .subscribe({
        next:(res)=>{
          alert("Truck updated Successfully");
          this.truckForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while updating the record!")

        }
      })

  }
  deleteTruck(){
    this.api.deleteTruck(this.editDataTruck.id)
  }

}
