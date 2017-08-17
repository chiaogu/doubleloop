import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  tabs = [
    {
      route: 'explore',
      icon: 'assets/images/ic_explore.svg'
    },
    {
      route: '',
      icon: 'assets/images/ic_board.svg'
    },
    {
      route: '',
      icon: 'assets/images/ic_settings.svg'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
