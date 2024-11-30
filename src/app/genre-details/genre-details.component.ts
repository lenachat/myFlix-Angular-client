import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-genre-details',
    templateUrl: './genre-details.component.html',
    styleUrls: ['./genre-details.component.scss'],
    standalone: false
})
export class GenreDetailsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string, description: string }) { }

  ngOnInit(): void { }
}
