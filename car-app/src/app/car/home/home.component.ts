import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Car } from '../car';
import { CarService } from '../car.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CarFormComponent } from '../car-form/car-form.component';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit{

  cars: Car[] = [];
  filteredCars:Car[]=[];
  readonly dialog=inject(MatDialog);

  car:Car ={
    id:0,
    name: '',
    description: '',
    price: 0,
    category: '',
    status: ''
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'category', 'status', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Car>();

  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;

  constructor(private carService:CarService){}

  ngAfterViewInit(): void {
    this.carService.fetchAllCars().subscribe((data)=>{

      this.cars = data

      this.dataSource = new MatTableDataSource<Car>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  searchCar(input: string) {
    this.filteredCars = this.cars.filter(item =>
      item.name.toLowerCase().includes(input.toLowerCase()) || 
      item.category.toLowerCase().includes(input.toLowerCase()) || 
      item.status.toLowerCase().includes(input.toLowerCase())
    );
    this.dataSource = new MatTableDataSource<Car>(this.filteredCars);
  }

  openDialog(car1: Car): void {
    const dialogRef = this.dialog.open(CarFormComponent, {
      data: { ...car1 }
    });

    dialogRef.afterClosed().subscribe((result: Car) => {
      if (result) {
        const index = this.cars.findIndex(car => car.id === result.id);
        if (index !== -1) {
          this.cars[index] = result; 
          this.dataSource = new MatTableDataSource<Car>(this.cars);
        }
      }
    });
  }

deleteCar(id: number) {
  const isConfirmed = window.confirm("Você tem certeza que quer excluir?");
  if (isConfirmed) {
    this.carService.deleteCar(id).subscribe(() => {
      this.cars = this.cars.filter(item => item.id !== id);
      this.dataSource = new MatTableDataSource<Car>(this.cars);
    });
  }
  window.location.reload();
}
}
