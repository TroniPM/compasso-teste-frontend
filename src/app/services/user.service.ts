import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RepositorioService } from './repositorio.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private REST_API_SERVER = "https://api.github.com/users/";
  private REST_API_REPOS = "/repos";
  private REST_API_STARRED = "/starred";


  constructor(
    private httpClient: HttpClient,
    private repositorioService: RepositorioService
  ) {

  }

  public getUserInfo(username: string) {
    const user = this.repositorioService.getUserByLogin(username);
    if (user) {
      // console.log("ACHOU USUARIO NO BANCO")
      return of(user);
    } else {
      // console.log("VAI FAZER REST PARA USUARIO")
      return this.httpClient.get(this.REST_API_SERVER.concat(username));
    }
  }

  public getUserRepos(username: string) {
    let repos: any = this.repositorioService.getUserRepos(username);
    if (repos) {
      // console.log("ACHOU REPOS NO BANCO")
      return of(repos);
    } else {
      // console.log("VAI FAZER REST PARA REPOS")
      return this.httpClient.get(this.REST_API_SERVER.concat(username).concat(this.REST_API_REPOS));
    }
  }

  public getUserStarred(username: string) {
    let starred: any = this.repositorioService.getUserStarred(username);
    if (starred) {
      // console.log("ACHOU STARRED NO BANCO")
      return of(starred);
    } else {
      // console.log("VAI FAZER REST PARA STARRED")
      return this.httpClient.get(this.REST_API_SERVER.concat(username).concat(this.REST_API_STARRED));
    }
  }
}
