import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Avis } from '../model/avis';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  private dbPath = '/Avis';

  AvissRef: AngularFirestoreCollection<Avis>;


  constructor(db: AngularFirestore) {
    this.AvissRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Avis> {
    return this.AvissRef;
  }


  create(Avis: Avis): any {
    return this.AvissRef.add({ ...Avis });
  }

}
