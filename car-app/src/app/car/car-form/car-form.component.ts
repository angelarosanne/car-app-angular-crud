import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Car } from '../car';
import { FormsModule } from '@angular/forms';
import { CarService } from '../car.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, MatSnackBarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent {
  readonly dialogRef = inject(MatDialogRef<CarFormComponent>);
  data = inject<Car>(MAT_DIALOG_DATA);

  constructor(private carService: CarService, private snackBar: MatSnackBar) {}
  closeDialog() {
    this.dialogRef.close();  // Fechar o diálogo
  }
  addOrEditCar(car: Car) {
    if (car.id === 0) {
      this.carService.createCar(car).subscribe({
        next: (data) => {
          this.snackBar.open("Carro adicionado com sucesso!", "Fechar", { duration: 3000 });
        },
        error: (err) => {
          this.snackBar.open("Erro ao adicionar o carro.", "Fechar", { duration: 3000 });
          console.error(err);
        },
      });
    } else {
      this.carService.updateCar(car).subscribe({
        next: (data) => {
          this.snackBar.open("Carro atualizado com sucesso!", "Fechar", { duration: 3000 });
        },
        error: (err) => {
          this.snackBar.open("Erro ao atualizar o carro.", "Fechar", { duration: 3000 });
          console.error(err);
        },
      });
    }
  }
}
