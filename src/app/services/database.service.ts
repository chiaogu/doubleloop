import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class DatabaseService {
  constructor(
    private db: AngularFireDatabase
  ) {}

  listSheet():FirebaseListObservable<any[]> {
    return this.db.list('/sheets');
  }

  saveSheet(sheet: any, id?: string): any{
    if(id !== undefined){
      return this.listSheet().set(id, sheet);
    }else{
      return this.listSheet().push(sheet);
    }
  }

}
