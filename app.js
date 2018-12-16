//take in root address
root_address = "oPounjEbJxY7YCBaVBm61Lf2ym9DgFnAdu"
root_init_value = 21000

let ajax = function (url, params, req_type, callback) {
            //let url = `https://testnet.flocha.in/${uri}`;
			console.log(url);
			
			let response = {};
			var http = new XMLHttpRequest();
            http.open(req_type, url, true);

            http.onreadystatechange = function () { //Call a function when the state changes.
                if (http.readyState == 4 && http.status == 200) {
                    response.success = true;
                    response.data = http.responseText;
                    callback(response.data);
                } else {
                    //response.data = http.responseText;
                    response.success = false;
                }
            }

            http.send(params);
        }

function get_root_transaction_hash(){
	var url = "https://testnet.flocha.in/api/txs?address=" + root_address;
	console.log(url);
	//var url = "https://testnet.flocha.in/api/txs/?address=oKv51tWdZWJyMJfVCtQoTo2FxrPicPtWbe";
	try {
            let res = ajax(url, null, 'GET', function (response) {
                try {
                      let transactions = JSON.parse(response);
                      console.log(response);
                      console.log(transactions);
                      console.log(transactions["txs"]);//object
                      get_transaction_info(transactions["txs"]);
                } catch (error) {
                        console.log(error);
                    }
                });
    } catch (error) {
                console.error(error);
        }
}

function get_transaction_info(transactions){
	var len = transactions.length;
	for(var i=0;i<len;i++){
		var root_block_hash = transactions[i]["blockhash"];
		var root_block_index = transactions[i]["blockheight"];
		console.log(root_block_hash,root_block_index);
	}
}

get_root_transaction_hash();
