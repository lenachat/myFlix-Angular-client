import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'app-director-details',
    templateUrl: './director-details.component.html',
    styleUrls: ['./director-details.component.scss'],
    standalone: false
})
export class DirectorDetailsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { name: string, biography: string, birth: string, death: string }) { }

  ngOnInit(): void { }

}
