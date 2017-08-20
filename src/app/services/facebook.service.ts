import { Injectable } from '@angular/core';
import { NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';

@Injectable()
export class FacebookService {
  private loadSdkAsync = new Promise<void>((resolve, reject) => {
    window['fbAsyncInit'] = () => this.zone.run(() => {
      FB.init({
        appId: environment.favebookAppId,
        xfbml: false,
        version: "v2.8"
      });
      resolve();
    });
    // Load the Facebook SDK asynchronously
    const s = "script";
    const id = "facebook-jssdk";
    var js, fjs = document.getElementsByTagName(s)[0];
    if (document.getElementById(id)) {
      resolve();
    } else {
      js = document.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs)
    }
  });

  constructor(
    private zone: NgZone
  ) {
  }

  share(href:string) {
    return this.loadSdkAsync.then(() => new Promise<Object>((resolve, reject) => {
      FB.ui({
        method: 'share',
        display: 'popup',
        href,
      }, function(response){
        resolve(response);
      });
    }));
  }
}
