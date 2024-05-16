import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../Models/AppState';
import { UserService } from '../../state/User/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  private profileInfoSubscription: Subscription | undefined;
  profileInfo : any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private userService: UserService 
  ) {
  }
  ngOnInit() {
    this.userService.getUserProfile();
    this.profileInfoSubscription = this.store.select(state => state.user.userProfile).subscribe((profile) => {
      this.profileInfo = profile;
    })
    console.log("profile information",this.profileInfo);
  }

  ngOnDestroy(): void {
    if(this.profileInfoSubscription){
      this.profileInfoSubscription?.unsubscribe();
    }
  }
}
