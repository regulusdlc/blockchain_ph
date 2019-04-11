
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';  // development only
import { Api, JsonRpc } from 'eosjs';


async function invokeAction() {
    const defaultPrivateKey = "5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr"; // bob
    //const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
    //const rpc = new JsonRpc('http:///65.52.186.97:8888'); 
    //const api = new Api({ rpc, signatureProvider });

    alert("Pumasok invokeAction");
    console.log("Pumasok testfunc");
    try{
     //console.log(await rpc.get_account('testacc'));
     
    }
    catch(err){
      console.log(err);
      alert(err);
    }
}

export class EosjsComponent{

  constructor() { 

  }

  testfunc2() {
    alert("Instantiated!");
    invokeAction();
  }


}
