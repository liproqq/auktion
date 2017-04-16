import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PlayerService} from '../../services/player.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  roster: Array<Object>;

  constructor(private authService:AuthService,
              private router:Router,
              private playerService: PlayerService) { }

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
    },
    err => {
      console.log(err);
      return false;
    });
  }

  callGetBids(){this.playerService.getBids(this.user).subscribe(roster => {
    this.roster = roster;
    },
    err => {
      console.log(err);
      return false;
    });
  }
}
