import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { RepositorioService } from 'src/app/services/repositorio.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  breadcrumb: string;

  constructor(
    private repositorioService: RepositorioService,
    private router: Router
  ) {
    this.setBreadcrumb(this.router.url);

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.setBreadcrumb(event.url);
      }
    });
  }

  ngOnInit(): void {
    this.user = this.repositorioService.getCurrentUser();

    if (!this.user) {
      this.router.navigate(["/"]);
    }

  }

  setBreadcrumb(url) {
    if (!url.includes("sidedata") || url.includes("infos")) {
      this.breadcrumb = "Informações";
    } else if (url.includes("repos")) {
      this.breadcrumb = "Repositórios";
    } else if (url.includes("starred")) {
      this.breadcrumb = "Favoritos";
    }
  }
}
