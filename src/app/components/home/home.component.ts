import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepositorioService } from 'src/app/services/repositorio.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username = 'tronipm';

  constructor(
    private userService: UserService,
    private repositorioService: RepositorioService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getUserInfoBtn() {
    if (this.username != null && this.username.length > 0) {
      this.userService.getUserInfo(this.username).subscribe((data: any) => {
        this.repositorioService.saveUser(data);
        this.repositorioService.setCurrentuser(data);

        this.router.navigate(["/profile"]);
      })
    }
  }
}
