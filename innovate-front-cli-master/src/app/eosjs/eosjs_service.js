const defaultPrivateKey = "5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr"; // bob
const addPrivateKey = "EOS8i1CXTY4Sz39XaQWX2RpccsCZ1nWM3w9zRhjCFChdci2Y65ck4";
const rpc = new eosjs_jsonrpc.JsonRpc('http:///65.52.186.97:8888');
const signatureProvider = new eosjs_jssig.JsSignatureProvider([defaultPrivateKey]);
const api = new eosjs_api.Api({ rpc, signatureProvider });

  //alert("before async"); 
function getReturnInfo(){
  alert("pumasok getReturnInfo");
  var jsonmsg = "";
    (async () => {
    try {
      const result = await rpc.get_info();
      //const result = await rpc.get_account('alice');
      //const result = await rpc.get_currency_balance('eosio.token', 'alice', 'SYS');
      jsonmsg += '\n\nTransaction pushed!\n\n' + JSON.stringify(result, null, 2);
    } catch (e) {
        jsonmsg = '\nCaught exception: ' + e;
      if (e instanceof eosjs_jsonrpc.RpcError)
        jsonmsg += '\n\n' + JSON.stringify(e.json, null, 2);
    }
  })();

    return jsonmsg;
}