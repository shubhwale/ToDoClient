import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'hello-client';
  public todo;
  public list = [];
  private url = 'http://localhost:3000/';
  constructor(public http: HttpClient) {}

  public async ngOnInit() {
    //console.log('init');
    //const url = 'http://localhost:3000/';
    const docs : any = await this.http.get(this.url).toPromise();
    this.list = docs;
  }

  public async delete(item) {
    //const url = 'http://localhost:3000/';
    await this.http.request('delete' , this.url, {body:item}).toPromise();
    const docs : any = await this.http.get(this.url).toPromise();
    this.list = docs;
  }

  public async create() {
    //const url = 'http://localhost:3000/';
    const body = {
      todo : this.todo
    };
    const check = this.todo.toString();
    //console.log(check);
    if(check.length>=2) {
      await this.http.post(this.url,body).toPromise();
      const docs : any = await this.http.get(this.url).toPromise();
      this.list = docs;
      this.todo='';
    }
  }

  public async edit(item) {
    let e = prompt('Enter updated text');
    if(e.toString().length>=2) {
      item.todo = e;
      await this.http.put(this.url,item).toPromise();
    }
    //const url = 'http://localhost:3000/';
    
    const docs : any = await this.http.get(this.url).toPromise();
    this.list = docs;
  }
}
