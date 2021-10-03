import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepositorioService } from 'src/app/services/repositorio.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {
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

    this.userService.getUserRepos(this.user.login).subscribe((data: any) => {
      this.user = this.repositorioService.addUserRepos(this.user.login, data);
    });
  }

}
