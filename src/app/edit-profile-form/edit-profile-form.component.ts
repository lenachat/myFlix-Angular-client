import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss']
})
export class EditProfileFormComponent {

  userData: any;

  constructor(
    public dialogRef: MatDialogRef<EditProfileFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { form: any },
    private fetchApiData: FetchApiDataService,
  ) {
    this.userData = { ...data }; // Clone user data passed to the dialog
  }

  /**
   * Updates user data and closes the dialog
   * @returns {void}
   * @method onSave
   * @memberof EditProfileFormComponent
   */
  onSave(): void {
    const userId = this.userData._id;

    this.fetchApiData.updateUser(userId, this.userData).subscribe((result) => {
      this.dialogRef.close(result);
    }, (error) => {
      console.error('Error updating user data:', error);
    });
    // localStorage.setItem('user', JSON.stringify(this.userData)); // Save updated user data back to localStorage
    // this.dialogRef.close(this.userData); // Close the dialog and pass updated user data
  }

  /**
   * Cancels the dialog without saving
   * @returns {void}
   * @method onCancel
   * @memberof EditProfileFormComponent
   */
  onCancel(): void {
    this.dialogRef.close(false); // Close dialog without saving
  }

}
