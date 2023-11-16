import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../model/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbPath = '/Users';

  UsersRef: AngularFirestoreCollection<User>;

  constructor(private db: AngularFirestore) {
    this.UsersRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<User> {
    return this.UsersRef;
  }
  getOne(email:string): any {
    // find user by email
    return this.db.collection('Users', ref => ref.where('email', '==', email)).snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map((a:any) => {
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
}
getCamion(): any {
  // find user by email
  return this.db.collection('Camions', ref => ref.where('etat', '==', 'disponible')).snapshotChanges()
  .pipe(
    map(actions => {
      return actions.map((a:any) => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
}
getDemandes(): any {
  // find user by email
  return this.db.collection('Demandes', ref => ref.where('etat', '==', 'en attente')).snapshotChanges()
  .pipe(
    map(actions => {
      return actions.map((a:any) => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
}
getMyDemandes(id:any): any {
  // find user by email
  return this.db.collection('Demandes', ref => ref.where('chauffeur.id', '==',id)).snapshotChanges()
  .pipe(
    map(actions => {
      return actions.map((a:any) => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
}

  create(User: User): any {
    return this.UsersRef.add({ ...User });
  }
  create_Demande(record:any) {
    return this.db.collection('Demandes').add(record);
  }
  update_Demande(recordID:any, record:any) {
    this.db.doc('Demandes/' + recordID).update(record);
    console.log('updated');
  }
  update_Camion(recordID:any, record:any) {
    this.db.doc('Camions/' + recordID).update(record);
    console.log('updated');
  }
  update(id: string, data: any): Promise<void> {
    return this.UsersRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.UsersRef.doc(id).delete();
  }
}
