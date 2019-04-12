import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '@/_services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    errorMessage = false;
    message = "";
    public myGenders:  Array<object> = [];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {

        this.myGenders = genders;
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)],
            ],
            sex: ['', Validators.required],
            email: ['', [Validators.required, Validators.email],],
            age: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        //if(this.createAccnt()){
            //alert("Pumasok sa register!")
          /*  this.userService.register(this.registerForm.value)
                .pipe(first())
                .subscribe(
                    data => {
                        this.alertService.success('Registration successful', true);
                        this.router.navigate(['/login']);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        //}*/
        
                var result, parsedResponse;

                (async () => {  
                    try {
                        result = await api.transact({
                            actions: [{
                              account: 'eosio',
                              name: 'newaccount',
                              authorization: [{
                                actor: 'alice',
                                permission: 'active',
                              }],
                              data: {
                                creator: 'alice',
                                name: this.registerForm.value.username,
                                owner: {
                                  threshold: 1,
                                  keys: [{
                                    key: defaultPublicKey,
                                    weight: 1
                                  }],
                                  accounts: [],
                                  waits: []
                                },
                                active: {
                                  threshold: 1,
                                  keys: [{
                                    key: defaultPublicKey,
                                    weight: 1
                                  }],
                                  accounts: [],
                                  waits: []
                                },
                              },
                            },
                            {
                                account: 'dbmanager',
                                name: 'insert',
                                authorization: [{
                                  actor: 'alice',
                                  permission: 'active',
                                }],
                                data : {
                                user: 'alice',
                                first_name: this.registerForm.value.firstName,
                                last_name: this.registerForm.value.lastName,
                                age: this.registerForm.value.age,
                                sex: this.registerForm.value.sex,
                                address: "PHILIPPINES",
                                email_addr: this.registerForm.value.email,
                                username: this.registerForm.value.username,
                                password: this.registerForm.value.password
                              }
                              }]
                          }, {
                            blocksBehind: 3,
                            expireSeconds: 30,
                          });
                        
                          //pre.textContent += '\n\nTransaction pushed!\n\n' + JSON.stringify(result, null, 2);
                          console.log(JSON.stringify(result, null, 2));
                          //console.log("Response code: "+parsedResponse.code);
                             // save new user
                            this.registerForm.value.id = users.length + 1;
                            users.push(this.registerForm.value);
                            localStorage.setItem('users', JSON.stringify(users));
                            
                            this.alertService.success('Registration successful', true);
                            this.router.navigate(['/login']).then( (e) => {
                                if (e) {
                                  console.log("Navigation is successful!");
                                } else {
                                  console.log("Navigation has failed!");
                                  console.log(e);
                                }
                              });

                    } catch (e) {
                        //  pre.textContent = '\nCaught exception: ' + e;
                        //pre.textContent += '\n\n' + JSON.stringify(e.json, null, 2);
                        console.log(JSON.stringify(e.json, null, 2));
                        this.alertService.error(e);
                        this.loading = false;
                    }
                  })();

    }
}
