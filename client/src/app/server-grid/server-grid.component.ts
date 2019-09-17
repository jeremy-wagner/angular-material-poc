import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
  selector: 'app-server-grid',
  templateUrl: './server-grid.component.html',
  styleUrls: ['./server-grid.component.css']
})
export class ServerGridComponent implements OnInit, AfterViewInit {
  data: PeriodicElement[] = [];
  displayedColumns: string[] = ['atomicNumber', 'name', 'symbol', 'atomicWeight'];
  resultsLength = 0;
  pageSize = 10;
  pageNumber = 1;
  nameFilter = '';
  sortDirection = 'asc';

  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getElements();
  }

  ngAfterViewInit() {

    // Handle
    this.paginator.page
    .subscribe(() => {
      this.pageNumber = this.paginator.pageIndex + 1;
      this.pageSize = this.paginator.pageSize;
      this.getElements();
    });

    this.sort.sortChange
    .subscribe(() => {
      this.sortDirection = this.sort.direction;
      this.paginator.pageIndex = 0;
      this.pageNumber = 1;
      this.getElements();
    });


  }

  getElements() {
    let url = `http://localhost:5000/api/elements/filtered?pageNumber=${this.pageNumber}&pageSize=${this.pageSize}&sort=${this.sortDirection}`;

    if (this.nameFilter.length > 0) {
      url += `&nameFilter=${this.nameFilter}`;
    }

    console.log(url);

    this.http.get<any>(url)
    .subscribe(
      response => {
        this.dataSource = new MatTableDataSource(response.elements);
        this.resultsLength = response.totalCount;
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
    this.nameFilter = filterValue;
    this.paginator.pageIndex = 0;
    this.pageNumber = 1;
    this.getElements();
  }

}
