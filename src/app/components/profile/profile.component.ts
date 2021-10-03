import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepositorioService } from 'src/app/services/repositorio.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    private repositorioService: RepositorioService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.user = this.repositorioService.getCurrentUser();

    if (!this.user) {
      console.log("EXCEPTION")
      this.router.navigate(["/"]);
    }
  }
}
