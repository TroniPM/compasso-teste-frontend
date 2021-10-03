import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepositorioService } from 'src/app/services/repositorio.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-starred',
  templateUrl: './starred.component.html',
  styleUrls: ['./starred.component.css']
})
export class StarredComponent implements OnInit {
  user: any;

  constructor(
    private userService: UserService,
    private repositorioService: RepositorioService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.user = this.repositorioService.getCurrentUser();

    if (!this.user) {
      this.router.navigate(["/"]);
    }

    this.userService.getUserStarred(this.user.login).subscribe((data: any) => {
      console.log('StarredComponent', data)
      this.user = this.repositorioService.addUserStarred(this.user.login, data);
    });
  }

}
