import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '@/_services';

@Component({templateUrl: 'custregister.component.html'})
export class CustRegisterComponent implements OnInit {
    customerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue == null) { 
            //alert("Pumasok!");
            this.router.navigate(['/login']);
            
        }
    }

    ngOnInit() {
        this.customerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['', Validators.required],
            contactInfo: ['', Validators.required],
            email: ['', Validators.required],
            wallet: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.customerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.customerForm.invalid) {
            return;
        }

        this.loading = true;
    }
}
