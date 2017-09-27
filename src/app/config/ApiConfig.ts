export class  Config{
  static baseUrl:string='http://localhost/api';

  /**
   * 首页发送建议 文本框方式
   * @type {string}
   */
  static index_advice:string=Config.baseUrl+'/index/advice';

  /**
   * 首页发送建议 文件方式
   * @type {string}
   */
  static index_advice_upload:string=Config.baseUrl+"/index/advice/file";

  static login:string=Config.baseUrl+"/auth/login";

  static register:string=Config.baseUrl+"/auth/register";

  //验证码
  static codeValidate=Config.baseUrl+"/codeValidate";

  //刷新验证token有效期
  static refresh_token:string=Config.baseUrl+"/auth/refresh";

  static change_password:string=Config.baseUrl+"/user/change-pwd";

   //参数type  其中具体为 1是发送注册码 2是修改密码
   //参数Email  用于发送的Email
   static send_email: string = Config.baseUrl + "/user/email/send";

  //忘记密码
  static forget_password:string=Config.baseUrl+"/user/forget-pwd";

  // 检查邮箱是否可以使用
  static check_email: string = Config.baseUrl + "/user/email/check";

  static admin_query_blog_all: string = Config.baseUrl + "/admin/index/blog/query-all";

  static admin_query_markdown_all: string = Config.baseUrl + "/admin/index/blog/query-markdown-all";

  static admin_query_ueditor_all: string = Config.baseUrl + "/admin/index/blog/query-ueditor-all";

  static admin_update_blog_by_id:string=Config.baseUrl+"/admin/index/blog/update-by-id";

  //获取当前用户信息
  static get_user_info: string = Config.baseUrl + "/admin/index/get-user-info";

  static change_user_info:string=Config.baseUrl+"/admin/index/change-user-info";
  
  static query_blog_all:string=Config.baseUrl+"/blog/query-all";

  static query_blog_by_id:string=Config.baseUrl+"/blog/query-by-id";

  static delete_blog_by_id:string=Config.baseUrl+"/blog/delete-by-id";

  static query_by_title:string=Config.baseUrl+"/blog/query-by-title";

  static query_title_all: string = Config.baseUrl + "/blog/query-title-all";

  static query_by_tag:string=Config.baseUrl+"/blog/query-by-tag";

  static query_tag_all: string = Config.baseUrl + "/blog/query-tag-all";

  static query_by_date: string = Config.baseUrl + "/blog/query-by-date";

  static query_date_all: string = Config.baseUrl + "/blog/query-date-all";


  static insert_markdown_blog:string=Config.baseUrl+"/markdown-editor/insert-blog";

  static markdown_query_all: string = Config.baseUrl + "/markdown-editor/query-all";

  static delete_markdown_blog:string=Config.baseUrl+"/markdown-editor/delete-by-id";

  static update_markdown_blog:string=Config.baseUrl+"/markdown-editor/update-blog-by-id";



  static insert_ueditor_blog: string = Config.baseUrl + "/ueditor-editor/insert-blog";

  static ueditor_query_all: string = Config.baseUrl + "/ueditor-editor/query-all";

  static delete_ueditor_blog:string=Config.baseUrl+"/ueditor-editor/delete-by-id";

  static update_ueditor_blog: string = Config.baseUrl + "/ueditor-editor/update-blog-by-id";


}
