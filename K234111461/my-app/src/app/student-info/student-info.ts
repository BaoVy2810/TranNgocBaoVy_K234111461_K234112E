import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-student-info',
  standalone: false,
  templateUrl: './student-info.html',
  styleUrl: './student-info.css'
})
export class StudentInfoComponent implements OnInit {
  moving = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cdr.markForCheck();
    queueMicrotask(() => this.cdr.markForCheck());
  }
}
