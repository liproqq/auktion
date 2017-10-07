import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PlayerService} from '../../services/player.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlist: Array<Object>;
  user:Object = JSON.parse(localStorage.getItem('user'));

  constructor(private authService:AuthService,
              private playerService: PlayerService,
              private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.playerService.getWatchlist(this.user).subscribe(watchlist => {
    this.watchlist = watchlist;
    },
    err => {
      console.log(err);
      return false;
    });
  }

  removeFromWatchlist(player){
    this.playerService.updateWatchlist(player, this.user);
    this.watchlist.splice(player.watchlist.indexOf(player.lastName), 1);
  }

}
