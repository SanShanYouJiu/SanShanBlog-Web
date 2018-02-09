export class UserInfo {

  id: number;
  avatar: string;
  username: string;
  email: string;
  blogLink: string;
  honor: string;
  status: number;

  constructor () {
      this.avatar = '';
      this.username = '';
      this.email = '';
      this.blogLink = '';
      this.honor  = '';
      this.status = 0 ;
  }

}
