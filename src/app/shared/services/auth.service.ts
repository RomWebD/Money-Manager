export class AuthService {
  
  private isAuthenticated = false;

  public login() {
    this.isAuthenticated = true;
  }
  public logOut() {
    this.isAuthenticated = false;
    window.localStorage.clear();
  }
  public isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
