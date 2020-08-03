import { Component, OnInit } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap';

// Interfaces
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

// Components
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  public modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.usersService.getAll()
      .subscribe((users: User[]) => {
        this.users = users;
      },
      e => console.log(e));
  }

  openEdit(user: User) {
    const initialState = { user };
    this.modalRef = this.modalService.show(FormComponent, { initialState });
    this.modalRef.content.onClose
      .subscribe( (save: boolean) => {
          if (save) {
            this.getUsers();
          }
      },
      e => console.log(e)
      );
  }

  delete(id: number) {
    this.usersService.delete(id)
      .subscribe(res => {
        if (res.sucess) {
          alert(res.message);
          location.reload();
        }
    });
  }
}
