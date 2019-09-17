import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  atomicNosition: number;
  atomicWeight: number;
  symbol: string;
}

@Component({
  selector: 'app-client-grid',
  templateUrl: './client-grid.component.html',
  styleUrls: ['./client-grid.component.css']
})
export class ClientGridComponent implements OnInit {
  data: PeriodicElement[] = [];
  displayedColumns: string[] = ['atomicNumber', 'name', 'symbol', 'atomicWeight'];
  resultsLength = 0;

  dataSource: MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getElements();
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  getElements() {
    this.http.get<PeriodicElement[]>('http://localhost:5000/api/elements').subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response);
        this.resultsLength = response.length;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.error(error);
      }
    );
  }

  shuffleColumns() {
    this.shuffleArray(this.displayedColumns);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
