import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userlist: any;

  constructor(private validateService: ValidateService,
              private flashMessage:FlashMessagesService,
              private authService:AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.getUserList().subscribe(data =>{
      data = data.sort((a,b) => {
        a = a.team;
        b = b.team;

        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;


      })

      this.userlist = data;
      console.log(data)
    })
  }
}
