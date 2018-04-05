export class  Config{
  static baseUrl= 'http://localhost/api';

  static main_base= Config.baseUrl + '/main';

  static auth_base = Config.baseUrl + '/auth';

  /**
   * 首页发送建议 文本框方式
   * @type {string}
   */
  static index_advice: string= Config.main_base + '/index/advice';

  /**
   * 首页发送建议 文件方式
   * @type {string}
   */
  static index_advice_upload: string= Config.main_base + '/index/advice/file';

  static login: string= Config.auth_base + '/jwt/token';

  static register: string= Config.main_base + '/auth/register';

  static register_novalidate: string= Config.main_base + '/auth/register-novalidate';

  // 验证码
  static codeValidate= Config.auth_base + '/codeValidate';

  // 刷新验证token有效期
  static refresh_token: string= Config.auth_base + '/jwt/refresh';

  // 是否可以登录
  static login_status: string = Config.main_base + '/auth/login-status';

  static change_password: string= Config.main_base + '/user/change-pwd';

   // 参数type  其中具体为 1是发送注册码 2是修改密码
   // 参数Email  用于发送的Email
   static send_email: string = Config.main_base + '/user/email/send';

  // 忘记密码
  static forget_password: string= Config.main_base + '/user/forget-pwd';

  // 检查邮箱是否可以使用
  static check_email: string = Config.main_base + '/user/email/check';

  static admin_query_blog_all: string = Config.main_base + '/admin/index/blog/all';

  static admin_query_markdown_all: string = Config.main_base + '/admin/index/blog/markdown-all';

  static admin_query_ueditor_all: string = Config.main_base + '/admin/index/blog/ueditor-all';

  static admin_update_blog_by_id: string= Config.main_base + '/admin/index/blog';

  // 获取当前用户信息
  static admin_get_user_info: string = Config.main_base + '/admin/index/user-info';

  static admin_change_user_info: string= Config.main_base + '/admin/index/user-info';

  static get_user_info: string= Config.main_base + '/user-info/';

  static user_info_basic: string ='/basic';

  static user_info_blogs: string= '/blogs';

  // 博客相关

  static query_blog_by_page: string= Config.main_base + '/blog/page/';

  static query_blog_by_id: string= Config.main_base + '/blog/id/';

  static delete_blog_by_id: string= Config.main_base + '/blog/id/';

  static query_by_title: string= Config.main_base + '/blog/title/';

  static query_title_by_page: string = Config.main_base + '/blog/title-page/';

  static query_by_tag: string= Config.main_base + '/blog/tag/';

  static query_tag_all: string = Config.main_base + '/blog/tag-all';

  static query_tag_by_page: string = Config.main_base + '/blog/tag-page/';

  static query_by_date: string = Config.main_base + '/blog/date/';

  static query_date_by_page: string = Config.main_base + '/blog/date-page/';

  static insert_markdown_blog: string= Config.main_base + '/markdown-editor/blog';


  static delete_markdown_blog: string= Config.main_base + '/markdown-editor/blog/id:';

  static update_markdown_blog: string= Config.main_base + '/markdown-editor/blog/id:';



  static insert_ueditor_blog: string = Config.main_base + '/ueditor-editor/blog';


  static delete_ueditor_blog: string= Config.main_base + '/ueditor-editor/blog/id:';

  static update_ueditor_blog: string = Config.main_base + '/ueditor-editor/blog/id:';

  // 投票相关
  static vote_blogId: string = Config.main_base + '/blog/vote/blogId:';

  static favour_blog: string ='/favour';

  static tread_blog: string = '/tread';

  static blog_vote_info: string = '/info';

  static vote_ip: string = Config.main_base + '/blog/vote/ip:';

  static ip_vote_info: string = '/ip-vote-info';

  static vote_user: string = Config.main_base + '/blog/vote/user:';

  static user_vote_info: string = '/info';

  //搜索相关
  static search_base: string = Config.baseUrl+'/search';

  static search_all: string = Config.search_base + '/all';

  static search_user_info: string = Config.search_base + '/user-info';

  static search_username: string = Config.search_base + '/username';

  static search_blog_info: string = Config.search_base + '/blog-info';

  static search_blog_content: string = Config.search_base + '/blog-content';
}
