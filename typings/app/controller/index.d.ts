// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/controller/account';
import ExportAuth from '../../../app/controller/auth';
import ExportBook from '../../../app/controller/book';
import ExportHome from '../../../app/controller/home';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    account: ExportAccount;
    auth: ExportAuth;
    book: ExportBook;
    home: ExportHome;
    user: ExportUser;
  }
}
