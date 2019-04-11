import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAllUsers();
        this.displayWallets();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }

    displayWallets(){
        //alert("pumasok display");
        var result;
        (async () => {
            try {
              result = await rpc.get_currency_balance(accountToken, this.currentUser.username);
              console.log(result);

              var wallets = Array.from(result);
              var x;
              var innerhtml;
              innerhtml = "";
              if(wallets.length > 0){
                for (const s of wallets){
                        let x = JSON.stringify(s);
                        x = x.replace(/"/g,"");
                        let wallet = x.split(" ");
                        innerhtml +="<tr>\n";
                        innerhtml +="<th class=\"text-center\" scope=\"row\">"+wallet[1]+"</th>\n";
                        innerhtml +="<th class=\"text-center\" scope=\"row\">"+wallet[0]+"</th>\n";
                        //document.write("<th scope="row">1</th>");
                        innerhtml +="</tr>\n"; 
                }
            }
            else {
                innerhtml +="<tr>\n";
                innerhtml +="<th class=\"text-center\" scope=\"row\">Your account does not have wallets.</th>\n";
                innerhtml +="</tr>\n";
            }
              document.getElementById("tblwallets").innerHTML = innerhtml;
            } catch (e) {
              console.log(e);
            }
          })();
    }
}