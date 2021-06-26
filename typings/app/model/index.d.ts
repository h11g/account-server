// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAccount from '../../../app/model/account';
import ExportBook from '../../../app/model/book';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Account: ReturnType<typeof ExportAccount>;
    Book: ReturnType<typeof ExportBook>;
    User: ReturnType<typeof ExportUser>;
  }
}
