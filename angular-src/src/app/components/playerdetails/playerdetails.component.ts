import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PlayerService} from '../../services/player.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playerdetails',
  templateUrl: './playerdetails.component.html',
  styleUrls: ['./playerdetails.component.css']
})
export class PlayerdetailsComponent implements OnInit {
  lastName: any;
  firstName: any;
  player:Object;
  private sub: any;

  constructor(private authService:AuthService,
              private router:Router,
              private playerService: PlayerService,
              private route: ActivatedRoute) { }

              ngOnInit() {
                this.sub = this.route.params.subscribe(params => {
                   this.lastName = params['id'];
                   this.firstName = params['id2'];

                   this.sub = this.playerService.getPlayerByFullName(this.lastName, this.firstName).subscribe( (player) => {
                    this.player = player;
                    }
                   );
                });
              }

}
