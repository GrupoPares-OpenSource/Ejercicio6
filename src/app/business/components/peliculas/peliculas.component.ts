import {Component, OnInit, ViewChild} from '@angular/core';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatTable, MatTableDataSource, MatTableModule} from "@angular/material/table";
import {FormsModule, NgForm} from "@angular/forms";
import {MatAnchor} from "@angular/material/button";
import {Pelicula} from "../../model/pelicula.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HttpDataService} from "../../service/http-data-servic.service";
import * as _ from 'lodash';  // Importa la librería Lodash para clonar objetos.
import cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInput,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    FormsModule,
    MatAnchor
  ],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent implements OnInit{
  @ViewChild('studentForm', {static: false})
  peliculaForm!: NgForm;

  peliculaData!: Pelicula;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'photo', 'duration', 'genre']

  isEditMode = false;

  constructor(private httpDataService: HttpDataService) {
    this.peliculaData = {} as Pelicula;
  }


  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.httpDataService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editItem(element: any) {
    this.peliculaData =  cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.peliculaForm.resetForm();
  }
  deleteItem(id: any) {
    this.httpDataService.deleteItem(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((o: any) => o.id !== id);
    });
  }

  addStudent() {
    let maxId : number = 0;
    maxId = this.dataSource.data.reduce((max:number, pelicula:any) => pelicula.id > max ? pelicula.id : max, 0) ;
    this.peliculaData.id = (Number(maxId) + 1).toString();
    console.log(maxId);
    this.httpDataService.createItem(this.peliculaData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  updateStudent() {
    this.httpDataService.updateItem(this.peliculaData.id, this.peliculaData).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: any) => {
        if (o.id == response.id) {
          o = response;
        }
        return o;
      });
    });

  }

  onSubmit() {
    if (this.peliculaForm.form.valid) {
      if (this.isEditMode) {
        this.updateStudent();
      } else {
        this.addStudent();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }
}
