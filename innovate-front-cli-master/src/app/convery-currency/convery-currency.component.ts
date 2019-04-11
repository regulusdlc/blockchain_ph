import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RpcError} from 'eosjs';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-convery-currency',
  templateUrl: './convery-currency.component.html',
  styleUrls: ['./convery-currency.component.css']
})
export class ConveryCurrencyComponent implements OnInit {
	currentUser: User;
    currentUserSubscription: Subscription;

	convertCurrencyForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    successMessage = false;
    errorMessage = false;
    message = "";

    public myMerchants:  Array<object> = [];
    public myCurrencies:  Array<object> = [];

	private from;
	public amountToSendDisp;
	public exchangeRate;

	constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }
	
 	ngOnInit() {
 		this.from = this.currentUser.username;
 		this.myMerchants = merchants;
 		this.myCurrencies = currencies;
 		this.amountToSendDisp = "0.0000";
 		this.exchangeRate = 1;

 		this.convertCurrencyForm = this.formBuilder.group({
            transferAmount: ['0.0000', Validators.required],
            transferCurrencyFrom: ['SYS', Validators.required], 
            transferMerchant: ['pal', Validators.required],
            transferConvertedAmount: ['0.0000', Validators.required], 
            transferCurrencyTo: ['PHP', Validators.required]
        }); 

		try {
			(async () => {
			    try {
			    	//const result = await rpc.get_currency_balance(accountToken, 'pal');
			    	//const result2 = await rpc.get_currency_balance(accountToken, 'alice');
			    	//const result3 = await rpc.get_currency_balance(accountToken, 'bob');

			    	//const result = await rpc.get_account(this.from);
			    	/*
			      	pre.textContent += '\n\nTransaction pushed!\n\n PAL:' 
			      		+ JSON.stringify(result, null, 2) 
			      		+ '\n\nAlice:' + JSON.stringify(result2, null, 2)
			      		+ '\n\Bob:' + JSON.stringify(result3, null, 2);
			      	*/
			    } catch (e) {
			      	pre.textContent = '\nCaught exception: ' + e;
			        pre.textContent += '\n\n' + JSON.stringify(e.json, null, 2);
			    }
			  })();
		} catch (e){
			console.log('\nCaught exception: ' + e);
			if (e instanceof eosjs_jsonrpc.RpcError) {
				console.log(JSON.stringify(e.json, null, 2));
			}
		}
  	}

	get f() { 
    	return this.convertCurrencyForm.controls; 
    }

    calculateAmountToSend(){
    	var transferCurrencyFrom = this.f.transferCurrencyFrom.value;
    	var transferCurrencyTo = this.f.transferCurrencyTo.value;
    	var myMerchant = this.f.transferMerchant.value;
    	var myExchangeRate = 1;
    	//get exchange rate
    	for (var i=0; i<this.myMerchants.length; i++){
    		if (this.myMerchants[i].merchant_code == myMerchant){
    			for (var j=0; j<this.myMerchants[i].exchange_rates.length; j++){
    				var ratesArray = this.myMerchants[i].exchange_rates[j].exchange_rate_name.split("/");
    				if (ratesArray[0] == transferCurrencyFrom && ratesArray[1] == transferCurrencyTo){
    					myExchangeRate = Number(this.myMerchants[i].exchange_rates[j].rate);
    				}
    			}

    		}

    	}
    	var amountToSend = Number(this.f.transferAmount.value) / myExchangeRate;
    	this.amountToSendDisp = amountToSend.toFixed(4);
    	this.exchangeRate = myExchangeRate;
    }

    clearFields(){
    	this.submitted = false;
    	this.convertCurrencyForm.reset(); 
    	this.convertCurrencyForm = this.formBuilder.group({
            transferAmount: ['0.0000', Validators.required],
            transferCurrencyFrom: ['SYS', Validators.required], 
            transferMerchant: ['pal', Validators.required],
            transferConvertedAmount: ['0.0000', Validators.required], 
            transferCurrencyTo: ['PHP', Validators.required]
        }); 
        this.amountToSendDisp = "0.0000";

    }

    onSubmit() {
    	this.submitted = true;
    	this.loading = true;
    	this.successMessage = false;
    	this.errorMessage = false;

    	// stop here if form is invalid
        if (this.convertCurrencyForm.invalid) {
            return;
        }

        var origAmount = Number(this.f.transferAmount.value).toFixed(4);
        var origAmountQuantity = origAmount + ' ' + this.f.transferCurrencyFrom.value;

        var exchangeRatio = (1 / Number(this.exchangeRate)).toFixed(4);
        var quantity = exchangeRatio + ' ' + this.f.transferCurrencyTo.value;

        try {
 			(async () => {
				  const result = await api.transact({
				    actions: [{
				      account: accountToken,
				      name: 'convert',
				      authorization: [{
				        actor: this.from,
				        permission: 'active'
				      },{
				        actor: this.f.transferMerchant.value,
				        permission: 'active'
				      }],
				      data: {
				        from: this.from,
				        to: this.f.transferMerchant.value,
				        quantity: origAmountQuantity,
				        conv: quantity,
				        memo: '',
				      },
				    }]
				  }, {
				    blocksBehind: 3,
				    expireSeconds: 30, 
				  });
				  this.loading = false;
				  this.successMessage = true;
				  this.errorMessage = false;
				  this.message = "Converted "+this.f.transferCurrencyFrom.value+" "+this.f.transferAmount.value+" to "+this.f.transferCurrencyTo.value+" "+this.amountToSendDisp;
				  this.clearFields();
				})();
 		} catch(e){
 			console.log('\nCaught exception: ' + e);
			if (e instanceof eosjs_jsonrpc.RpcError) {
				console.log(JSON.stringify(e.json, null, 2));
			}
			this.loading = false;
			this.errorMessage = true;
			this.successMessage = false;
		}
    }    



}
