import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RepositorioService {
  users: any;
  storageTag: string = "github-compasso-users";
  storageCurrentTag: string = "github-compasso-current-user";

  currentUser: any;

  constructor(private cookieService: CookieService) {
    const users = this.getCookieData(this.storageTag);
    if (users) {
      // console.log('ACHOU BANCO DE DADOS')
      // console.log(users)
      this.users = users;
    } else {
      // console.log('NAO ACHOU BANCO DE DADOS. VAI CRIAR FAKE')
      this.users = {};
      this.users["TroniPM"] = {
        "login": "TroniPM",
        "id": 9244381,
        "node_id": "MDQ6VXNlcjkyNDQzODE=",
        "avatar_url": "https://avatars.githubusercontent.com/u/9244381?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/TroniPM",
        "html_url": "https://github.com/TroniPM",
        "followers_url": "https://api.github.com/users/TroniPM/followers",
        "following_url": "https://api.github.com/users/TroniPM/following{/other_user}",
        "gists_url": "https://api.github.com/users/TroniPM/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/TroniPM/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/TroniPM/subscriptions",
        "organizations_url": "https://api.github.com/users/TroniPM/orgs",
        "repos_url": "https://api.github.com/users/TroniPM/repos",
        "events_url": "https://api.github.com/users/TroniPM/events{/privacy}",
        "received_events_url": "https://api.github.com/users/TroniPM/received_events",
        "type": "User",
        "site_admin": false,
        "name": "Paulo Mateus",
        "company": "@philips-emr ",
        "blog": "",
        "location": "Brazil",
        "email": null,
        "hireable": true,
        "bio": "Computer Scientist | d(^~^)b",
        "twitter_username": "paulomatew",
        "public_repos": 50,
        "public_gists": 1,
        "followers": 29,
        "following": 22,
        "created_at": "2014-10-15T01:19:05Z",
        "updated_at": "2021-08-30T16:44:37Z"
      };
    }
  }

  saveUser(dados: any) {
    this.users[dados.login] = dados;
    this.setCookieData(this.storageTag, this.users);
  }

  getUserByLogin(username: string): any {
    if (username == null || username.length == 0) {
      return null;
    }

    const keys = Object.keys(this.users);
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];

      if (element.toUpperCase() == username.toUpperCase()) {
        return this.users[element];
      }
    }

    return null;
  }

  getCurrentUser() {
    return this.currentUser || this.getCookieData(this.storageCurrentTag);
  }

  setCurrentuser(user: any) {
    this.currentUser = user;
    this.setCookieData(this.storageCurrentTag, user);
  }

  setCookieData(tag: string, data: any) {
    this.cookieService.set(tag, JSON.stringify(data), 365, "/", "localhost", false, "Strict");
  }

  getCookieData(tag: string) {
    let data = this.cookieService.get(tag);
    if (data) {
      return JSON.parse(data);
    }

    return null;
  }

  getUserRepos(username: string): boolean {
    const user = this.getUserByLogin(username);
    if (user && user.repos) {
      return user.repos;
    } else {
      return null;
    }
  }

  addUserRepos(username: string, dados: Object) {
    const user = this.getUserByLogin(username);
    if (user) {
      user.repos = dados;
      this.users[username] = user;

      this.saveUser(user);
      this.setCurrentuser(user);
    }

    return user;
  }

  addUserStarred(username: string, dados: Object) {
    const user = this.getUserByLogin(username);
    if (user) {
      user.starred = dados;
      this.users[username] = user;

      this.saveUser(user);
      this.setCurrentuser(user);
    }

    return user;
  }

  getUserStarred(username: string): boolean {
    const user = this.getUserByLogin(username);
    if (user && user.starred) {
      return user.starred;
    } else {
      return null;
    }
  }

}
