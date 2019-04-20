import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';
  ep = 0;
  tags = '';
  thumbnail = '';
  author = '';
  date = '';
  md = '### Hello world';
  input = '';
  doc;
  id: string;
  updating = false;
  item: any;
  newId: string;
  constructor(public afs: AngularFirestore) {

  }

  post() {
    var answer = confirm("Save data?")
    if (answer) {
      this.newId = this.afs.createId();
      this.afs.collection('posts').doc(this.newId).set({
        title: this.title,
        episode: this.ep,
        tags: this.tags,
        thumbnail: this.thumbnail,
        author: this.author,
        date: this.date,
        body: this.md
      }).then(
        () => {alert("Success!"); this.id = this.newId }
      ).catch(
        () => alert('LMAO')
      );

      this.afs.collection('post-list').add(
        {
          thumbnail: this.thumbnail,
          description: this.title,
          post_id: this.newId
        }
      )
    }
  }
  update() {
    if(this.id) {
      var answer = confirm("Update data?")
      if (answer) {
        this.afs.collection<any>('posts').doc(this.id).set({
          title: this.title,
          episode: this.ep,
          tags: this.tags,
          thumbnail: this.thumbnail,
          author: this.author,
          date: this.date,
          body: this.md
        }).then(() => alert("Update successful!!!!!")).catch(() => alert("FIRE FIRE FIRE!!!!"));
      }
    }
    else {
      alert("Sorry bud. ID doesn't exist");
    }
  }

  search() {
    console.log(this.input)
    this.item = this.afs.collection('posts', ref => ref.where('title', '==', this.input)).snapshotChanges().subscribe(
      res => {
        if(res.length > 0) {
          alert('It exist !!!!');
          console.log(res[0].payload.doc.data());
          var data = res[0].payload.doc.data();
          this.title = data['title'];
          this.ep = data['episode'];
          this.tags = data['tags'];
          this.thumbnail = data['thumbnail'];
          this.author = data['author'];
          this.date = data['date'];
          this.md = data['body'];
          this.id = res[0].payload.doc.id;
          this.updating = true;
          console.log(this.id);
        }
        else alert('Nope! nothing!')
      },
      error => console.log(error)
    );
  }
  reset() {
    var answer = confirm('ARE YOU SURE YOU WANT TO RESET ????');
    if(answer) {
      this.title = '';
      this.ep = 0;
      this.tags = '';
      this.thumbnail = '';
      this.author = '';
      this.date = '';
      this.md = '### Hello world';
      this.input = '';
      this.doc;
      this.id = "No id";
      this.updating = false;
    }
  }

  delete() {
    if(this.id) {
      var answer = confirm("ARE YOU SURE???? BRUH???");
      if(answer) {
        this.item.unsubscribe();
        this.afs.collection('posts').doc(this.id).delete().then(() => alert("Deleted!!!")).catch(() => alert("Fail to delete."));
      }
    }
  }
}
