import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Serv } from '../model/serv';
import { Demande } from '../model/demande';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private dbPath = '/Taches';
  private servPath = '/Services';
  private demandePath = '/Demandes';

  EventsRef: AngularFirestoreCollection<Event>;
  ServRef!: AngularFirestoreCollection<Serv>;
  demandeRef!: AngularFirestoreCollection<Demande>;


  constructor(private db: AngularFirestore) {
    this.EventsRef = db.collection(this.dbPath);
    this.ServRef = db.collection(this.servPath);
    this.demandeRef = db.collection(this.demandePath);
  }

  getAll(id:any):any {
      return this.db.collection('Taches', ref => ref.where('user.id','==', id)).snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map((a:any) => {
          const data = a.payload.doc.data() as Event;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getEvent(id:any):any {
// get event by id from firebase with document id as parameter Event
    return this.db.collection('Taches').doc(id).snapshotChanges();

  }
  getAllServices():any {
      return this.db.collection('Services').snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map((a:any) => {
          const data = a.payload.doc.data() as Event;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  getServices(type:any):any {
    return this.db.collection('Categories', ref => ref.where('type', '==', type)).snapshotChanges()
  .pipe(
    map(actions => {
      return actions.map((a:any) => {
        const data = a.payload.doc.data() as Event;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
}
  getMyServices(id:any):any {
    return this.db.collection('Services', ref => ref.where('user.id', '==', id)).snapshotChanges()
  .pipe(
    map(actions => {
      return actions.map((a:any) => {
        const data = a.payload.doc.data() as Event;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
}
  getMyDemandes(id:any):any {

    return this.db.collection('Demandes', ref => ref.where('event.user.id', '==', id)).snapshotChanges()
  .pipe(
    map(actions => {
      return actions.map((a:any) => {
        const data = a.payload.doc.data() as Event;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
  );
}
createdemande(Demande: any): any {
  return this.demandeRef.add({ ...Demande });
}

  create(Event: Event): any {
    return this.EventsRef.add({ ...Event });
  }
  createService(Serv: Serv): any {
    return this.ServRef.add({ ...Serv });
  }

}
