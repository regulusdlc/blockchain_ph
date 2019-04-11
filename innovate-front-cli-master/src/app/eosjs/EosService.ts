//EosService.js
import { Api, JsonRpc } from 'eosjs';
import {JsSignatureProvider} from 'eosjs/dist/eosjs-jssig';

async function invokeAction() {
  const rpc = new JsonRpc('http:///65.52.186.97:8888');
  const privateKey = "5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr";
  const signatureProvider = new JsSignatureProvider([privateKey]);
  const api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });
  try {
      const resultWithConfig = await rpc.get_account('testacc');
      return resultWithConfig;
    } catch (err) {
      throw err;
    }
}
export class EosService {

  static get_account() {

    alert("Pumasok sa get_account");
    return new Promise((resolve, reject) => {
      invokeAction()
        .then(() => {
          resolve();
        })
        .catch(err => {
          alert(err);
        });
    });
  }
}