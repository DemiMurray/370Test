import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  /**
   * This is the Users constructor which facilitates classes and their functionality to be injected into the componen
   * @param userService {UserService} injects the user service which provides the CRUD functionality to localStorage
   * @param snack {MatSnackBar} this helps with small popup notifications after we've deleted an item for example (angular Material)
   * @param router {Router} this object will help us move through pages 
   * @param dialog {MatDialog} This object helps us open popup dialogs to confirm deletion. (Angular Material)
   */
  constructor(private userService: UserService, private snack: MatSnackBar,
              private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.readUsers();
  }

  /**
   * Calls the getAll function in the service to get users.
   * The dataSource property is then updated to be displayed in the angular material data table
   */
  readUsers(): void {
    this.dataSource = new MatTableDataSource<User>(this.userService.getAll());
  }

  /**
   * Opens a confirm modal and if confirmed the user will then be deleted and the users table updated
   * @param inUser {User} parameter to be deleted.
   */
  deleteUser(inUser: User) {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
        disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if(res) {
        this.userService.deleteUser(inUser);
        this.readUsers();
      }
    });
  }

}
