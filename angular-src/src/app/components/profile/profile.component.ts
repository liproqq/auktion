import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PlayerService} from '../../services/player.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  roster: Array<Object>;
  showBids:boolean = false;

  constructor(private authService:AuthService,
              private router:Router,
              private playerService: PlayerService,
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  callGetRoster(){this.playerService.getRoster(this.user).subscribe(roster => {
    this.roster = roster;
    this.showBids =false;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  callGetBids(){this.playerService.getBids(this.user).subscribe(roster => {
    this.roster = roster;
    this.showBids = true;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  withdrawOffer(id){
    this.playerService.deleteBid(id);
    this.flashMessage.show("Offer withdrawn", {
      cssClass: 'alert-success',
      timeout: 10000});
    this.router.navigate(['/profile']);
    this.roster = null;
  }
}
