import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces';
import { UserService } from 'src/app/services/user/user.service';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.scss']
})
/**
 * This component will act as the add or update component.
 * The isAddMode property will be true or false based on the route parameter that is either passed or
 * not passed to this route
 *
 */
export class AddEditUsersComponent implements OnInit {

    form: FormGroup;
    id: number;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    user: User;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
    ) {}

    /**
     * This is the OnInit lifecycle hook that runs just before our component mounts.
     * We configure our form in here and read the user with the id that is  passed to the route
     * if there was a id that was passed.
     */
  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    // password not required in edit mode
    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
        passwordValidators.push(Validators.required);
    }

    const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };
    this.form = this.formBuilder.group({
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        role: ['', Validators.required],
        password: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
        confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
    }, formOptions);

    if (!this.isAddMode) {
      this.user = this.userService.getUserById(this.id);

        this.form = this.formBuilder.group({
        title: [this.user.title, Validators.required],
        firstName: [this.user.firstName, Validators.required],
        lastName: [this.user.lastName, Validators.required],
        email: [this.user.email, [Validators.required, Validators.email]],
        role: [this.user.role, Validators.required],
        password: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
        confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
    }, formOptions);
    }
  }

  /**
   * Because we use one component for adding and updating, this function, based on the state of the component
   * decides if it is an add or an update
   * @returns void
   */
  onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.createUser();
    } else {
        this.updateUser();
    }
  }
 /**
  * This function creates a new user this will call the addUser function in the service,
  * reset the form and route back to the home page
  */
  createUser() {
    const user: User = this.form.value;
    this.userService.addUser(user);
    this.router.navigateByUrl('');
  }

  /**
   * This function calls the update user function that is iin the service
   * from there we reset the form and navigate to the home page
   */
  updateUser() {
    const user: User = this.form.value;
    user.id = this.user.id;
    this.userService.updateUser(user);
    this.form.reset();
    this.router.navigateByUrl('');
  }

  /**
   * Goes back to the users page with the users table,
   * this function also resets the form to make sure controls are empty again.
   */
  Close() {
    this.form.reset();
    this.router.navigateByUrl('');
  }
}
