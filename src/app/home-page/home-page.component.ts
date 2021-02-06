import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public addUser(): void {
    // let newUser = new User(id, name, email, role, crDate);
    // this.users.push(newUser);
    console.log('user is added');
}

}
