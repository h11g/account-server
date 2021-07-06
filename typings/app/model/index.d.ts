// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccountGroup from '../../../app/model/account-group';
import ExportAccount from '../../../app/model/account';
import ExportBook from '../../../app/model/book';
import ExportCategory from '../../../app/model/category';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    AccountGroup: ReturnType<typeof ExportAccountGroup>;
    Account: ReturnType<typeof ExportAccount>;
    Book: ReturnType<typeof ExportBook>;
    Category: ReturnType<typeof ExportCategory>;
    User: ReturnType<typeof ExportUser>;
  }
}
