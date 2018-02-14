export class Blog{
  type: number;//类型判断
  id: number;
  user: string;
  title: string;
  content: string;
  time: number;
  tag: string;

  constructor() {
    this.type = 0 ;
    this.id = 0;
    this.user = '';
    this.content = '';
    this.time = 0;
    this.tag = '';
  }
}
