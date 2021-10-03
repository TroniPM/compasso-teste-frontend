import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepositorioService } from 'src/app/services/repositorio.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.css']
})
export class InfosComponent implements OnInit {
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

    if (this.user.created_at) {
      this.user.created_at_formated = this.dataAtualFormatada(this.user.created_at);
    }

  }

  dataAtualFormatada(dateToParse) {
    let date: Date;
    if (dateToParse) {
      date = new Date(dateToParse);
    } else {
      date = new Date();
    }

    const dia = date.getDate().toString(),
      diaF = (dia.length == 1) ? '0' + dia : dia,
      mes = (date.getMonth() + 1).toString(),
      mesF = (mes.length == 1) ? '0' + mes : mes,
      anoF = date.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
  }


}
