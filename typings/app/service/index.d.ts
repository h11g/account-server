// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAccount from '../../../app/service/Account';
import ExportAccountGroup from '../../../app/service/AccountGroup';
import ExportBook from '../../../app/service/Book';
import ExportCategory from '../../../app/service/Category';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    account: AutoInstanceType<typeof ExportAccount>;
    accountGroup: AutoInstanceType<typeof ExportAccountGroup>;
    book: AutoInstanceType<typeof ExportBook>;
    category: AutoInstanceType<typeof ExportCategory>;
    test: AutoInstanceType<typeof ExportTest>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
