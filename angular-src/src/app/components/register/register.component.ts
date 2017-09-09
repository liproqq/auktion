import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  team: String;
  steam: String;
  userlist: any;
  teams: Array<Object> = [{short: "ATL", long:"Atlanta Hawks"},{short: "BOS", long:"Boston Celtics"},{short: "BKN", long:"Brooklyn Nets"},{short: "CHA", long:"Charlotte Hornets"},{short: "CHI", long:"Chicago Bulls"},{short: "CLE", long:"Cleveland Cavaliers"},{short: "DAL", long:"Dallas Mavericks"},{short: "DEN", long:"Denver Nuggets"},{short: "DET", long:"Detroit Pistons"},{short: "GSW", long:"Golden State Warriors"},{short: "HOU", long:"Houston Rockets"},{short: "IND", long:"Indiana Pacers"},{short: "LAC", long:"Los Angeles Clippers"},{short: "LAL", long:"Los Angeles Lakers"},{short: "MEM", long:"Memphis Grizzlies"},{short: "MIA", long:"Miami Heat"},{short: "MIL", long:"Milwaukee Bucks"},{short: "MIN", long:"Minnesota Timberwolves"},{short: "NOP", long:"New Orleans Pelicans"},{short: "NYK", long:"New York Knicks"},{short: "OKC", long:"Oklahoma City Thunder"},{short: "ORL", long:"Orlando Magic"},{short: "PHI", long:"Philadelphia 76ers"},{short: "PHX", long:"Phoenix Suns"},{short: "POR", long:"Portland Trail Blazers"},{short: "SAC", long:"Sacramento Kings"},{short: "SAS", long:"San Antonio Spurs"},{short: "TOR", long:"Toronto Raptors"},{short: "UTA", long:"Utah Jazz"},{short: "WAS", long:"Washington Wizards"}];


  constructor(
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router
  ) { }

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
    });
  }

  onRegisterSubmit(){
    const user = {
      email: this.email,
      username: this.username,
      password: this.password,
      team: this.team,
      steam: this.steam
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong. Are you already registered? Contact an admin.', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });

  }

}
