import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/borard.model';
import { Column } from 'src/app/models/column.model';

declare var jQuery: any;

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  constructor(){};

  addingColumn = false;
  addColumnText: string;
  editField: string;

  board: Board = new Board('Test', [
    new Column('Ideas', [ 
    'Stworzenie CI',
    'Stworzenie widoku tablicy',
    'Zaprojektowanie bazy danych'
  ]),
    new Column('Todo', [
    'Test API',
    'Dodanie przycisku tworzenia tablicy'
  ]),
    new Column('Done', [
     'Drag - drop' 
  ])
  ]);


  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  updateList(property: string, event: any) {
    const editField = event.target.textContent;
    this.board[property] = editField;
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  enableAddColumn() {
    this.addingColumn = true;
    let input = jQuery('.add-column')[0]
      .getElementsByTagName('input')[0];

    setTimeout(function () { input.focus(); }, 0);
  }

  addColumnOnEnter(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      if (this.addColumnText && this.addColumnText.trim() !== '') {
        this.addColumn();
      } else {
        this.clearAddColumn();
      }
    }
    else if (event.keyCode === 27) {
      this.clearAddColumn();
    }
  }

  addColumn() {
    //TO DO!!!!
  }

  addColumnOnBlur() {
    if (this.addColumnText && this.addColumnText.trim() !== '') {
      this.addColumn();
    }
    this.clearAddColumn();
  }

  clearAddColumn() {
    this.addingColumn = false;
    this.addColumnText = '';
  }



}
