export class  Config{
  static baseUrl= 'http://localhost/api';

  /**
   * 首页发送建议 文本框方式
   * @type {string}
   */
  static index_advice: string= Config.baseUrl + '/index/advice';

  /**
   * 首页发送建议 文件方式
   * @type {string}
   */
  static index_advice_upload: string= Config.baseUrl + '/index/advice/file';

  static login: string= Config.baseUrl + '/auth/login';

  static register: string= Config.baseUrl + '/auth/register';

  static register_novalidate: string= Config.baseUrl + '/auth/register-novalidate';

  // 验证码
  static codeValidate= Config.baseUrl + '/codeValidate';

  // 刷新验证token有效期
  static refresh_token: string= Config.baseUrl + '/auth/refresh-token';

  // 是否可以登录
  static login_status: string = Config.baseUrl + '/auth/login-status';

  static change_password: string= Config.baseUrl + '/user/change-pwd';

   // 参数type  其中具体为 1是发送注册码 2是修改密码
   // 参数Email  用于发送的Email
   static send_email: string = Config.baseUrl + '/user/email/send';

  // 忘记密码
  static forget_password: string= Config.baseUrl + '/user/forget-pwd';

  // 检查邮箱是否可以使用
  static check_email: string = Config.baseUrl + '/user/email/check';

  static admin_query_blog_all: string = Config.baseUrl + '/admin/index/blog/all';

  static admin_query_markdown_all: string = Config.baseUrl + '/admin/index/blog/markdown-all';

  static admin_query_ueditor_all: string = Config.baseUrl + '/admin/index/blog/ueditor-all';

  static admin_update_blog_by_id: string= Config.baseUrl + '/admin/index/blog';

  // 获取当前用户信息
  static admin_get_user_info: string = Config.baseUrl + '/admin/index/user-info';

  static admin_change_user_info: string= Config.baseUrl + '/admin/index/user-info';

  static get_user_info: string= Config.baseUrl + '/user-info/';

  static user_info_basic: string ='/basic';

  static user_info_blogs: string= '/blogs';

  static query_blog_all: string= Config.baseUrl + '/blog/all';

  static query_blog_by_page: string= Config.baseUrl + '/blog/page/';

  static query_blog_by_id: string= Config.baseUrl + '/blog/id/';

  static delete_blog_by_id: string= Config.baseUrl + '/blog/id/';

  static query_by_title: string= Config.baseUrl + '/blog/title/';

  static query_title_all: string = Config.baseUrl + '/blog/title-all';

  static query_title_by_page: string = Config.baseUrl + '/blog/title-page/';

  static query_by_tag: string= Config.baseUrl + '/blog/tag/';

  static query_tag_all: string = Config.baseUrl + '/blog/tag-all';

  static query_tag_by_page: string = Config.baseUrl + '/blog/tag-page/';

  static query_by_date: string = Config.baseUrl + '/blog/date/';

  static query_date_all: string = Config.baseUrl + '/blog/date-all';

  static query_date_by_page: string = Config.baseUrl + '/blog/date-page/';

  static insert_markdown_blog: string= Config.baseUrl + '/markdown-editor/blog';

  static markdown_query_all: string = Config.baseUrl + '/markdown-editor/blog/all';

  static delete_markdown_blog: string= Config.baseUrl + '/markdown-editor/blog/id:';

  static update_markdown_blog: string= Config.baseUrl + '/markdown-editor/blog/id:';



  static insert_ueditor_blog: string = Config.baseUrl + '/ueditor-editor/blog';

  static ueditor_query_all: string = Config.baseUrl + '/ueditor-editor/blog/all';

  static delete_ueditor_blog: string= Config.baseUrl + '/ueditor-editor/blog/id:';

  static update_ueditor_blog: string = Config.baseUrl + '/ueditor-editor/blog/id:';

  // 投票相关
  static vote_blogId: string = Config.baseUrl + '/blog/vote/blogId:';

  static favour_blog: string ='/favour';

  static tread_blog: string = '/tread';

  static blog_vote_info: string = '/info';

  static vote_ip: string = Config.baseUrl + '/blog/vote/ip:';

  static ip_vote_info: string = '/ip-vote-info';

  static vote_user: string = Config.baseUrl + '/blog/vote/user:';

  static user_vote_info: string ='/info';
}
