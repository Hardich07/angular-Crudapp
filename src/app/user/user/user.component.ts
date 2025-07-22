// user.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User, UserService } from '../../../service/user.service';
import { ToastComponent } from '../../common/toast/toast.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: true,  
  imports: [CommonModule, FormsModule, ToastComponent ],
  templateUrl:'user.component.html'
})
export class UserComponent {
  private userService = inject(UserService);
  users: User[] = [];
  newUser: User = { name: '', email: '' };
    toastMessage: string | null = null;

  constructor() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => (this.users = users));
  }

   showToast(message: string) {

    this.toastMessage = message;
    setTimeout(() => (this.toastMessage = null), 2000);
  }

  addUser() {
  //  debugger
  if(this.newUser.name == "" && this.newUser.email == "" ){
 this.showToast(`First Enter the Data!!`);
  }
   else{
     this.userService.createUser(this.newUser).subscribe(user => {
      this.users.push(user);
      this.newUser = { name: '', email: '' };
            this.showToast(`Added user: ${user.name}`);

    });
   }
  }

  updateUser(user: User) {
    this.userService.updateUser(user).subscribe(updated => {
      const index = this.users.findIndex(u => u.id === updated.id);
      if (index > -1) this.users[index] = updated;
      this.showToast(`Updated user: ${updated.name}`);

    });
  }

  deleteUser(id: number) {
      this.userService.deleteUser(id).subscribe(() => {
      const deletedUser = this.users.find((u) => u.id === id);
      this.users = this.users.filter(u => u.id !== id);
      this.showToast(`Deleted user: ${deletedUser?.name ?? 'Unknown'}`);

    });
  }
}
