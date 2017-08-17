import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from "rxjs/Observable";

@Injectable()
export class DatabaseService {
  constructor(
    private db: AngularFireDatabase
  ) {}

  getSheet(id: string): Observable<any> {
    return this.db.object(`/sheets/${id}`);
  }

  listSheet():Observable<any[]> {
    return this.db.list('/sheets').map(sheets => sheets.reverse());
  }

  saveSheet(sheet: any, id?: string): any{
    if(id !== undefined){
      return this.db.list('/sheets').set(id, sheet);
    }else{
      return this.db.list('/sheets').push(sheet);
    }
  }

}
