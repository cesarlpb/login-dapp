import Modal from "./Modal";
import Token from "./components/Token"
import styles from "./DEX.css";
import { Moralis } from 'moralis';

function DEX(){

    let currentTrade = {};
    let currentTradeSide = ''; // "from" or "to"
    let tokens;
    let result = {};
    let localOneInchTokens = {};
    let fromTokenAddress = '';
    let toTokenAddress = '';
    let amount = 0;
    let chain = 'eth';

    window.onload = async function(){
        await Moralis.initPlugins();
        let startTime = new Date();
        console.log(startTime);
        result = await Moralis.Plugins.oneInch.getSupportedTokens({
            chain: 'eth', // Todo: set more chains
        });
        let endTime = new Date();
        console.log(`Loaded in: ${endTime - startTime} ms`);
        // Checking if list exists
        localOneInchTokens = localStorage.getItem("oneInchTokens") 
        ? JSON.parse(localStorage.getItem(("oneInchTokens"))) 
        : [];
        // If does not exist, saving to LocalStorage
        localOneInchTokens.length < 1 
        ? localStorage.setItem("oneInchTokens", JSON.stringify(result.tokens)) 
        : console.log(`Saved ${result.tokens.length} tokens to localStorage`);
    };

    async function init(){
        // await Moralis.initPlugins();
        // await Moralis.enable();

        let startTime = new Date();
        // console.log(startTime);
        await listAvailableTokens();
        let endTime = new Date();
        // console.log(endTime);
        // console.log( `${endTime - startTime} ms` )

    }

    async function listAvailableTokens(){
        // const result = await Moralis.Plugins.oneInch.getSupportedTokens({
        //     chain: 'eth', // Todo: set more chains
        // });
        // console.log(result.tokens);

        localOneInchTokens.length > 1 
        ? tokens = localOneInchTokens :
        tokens = result.tokens;

        let parent = document.getElementById("token_list");
        parent.innerHTML = '';
        let counter = 0;
        for(const address in tokens){
            let token = tokens[address];
            
            // let div = <Token address={address} token={token}/>
            let div = document.createElement("div");
            if(address != '' && address != undefined)
            {
                div.setAttribute("data-address", address);
                div.className = "token_row";
                let html = `
                <img className="token_list_img" style="width:20px;" src=${token.logoURI}>
                <span className="token_list_text">${token.symbol}</span>
                `;
                
                // Todo: change listener to change for select element
                // https://stackoverflow.com/questions/47058077/how-can-i-add-an-event-listener-to-a-select-element
                div.addEventListener("click", async (event) => {
                    let address = await event.target.getAttribute("data-address");
                    currentTrade[currentTradeSide] = tokens[address];
                    switch(currentTradeSide){
                        case "from":
                            document.querySelector("#from_token_label").innerText = token.symbol;
                            fromTokenAddress = token.address;
                            break;
                        case "to":
                            document.querySelector("#to_token_label").innerText = token.symbol;
                            toTokenAddress = token.address;
                            break;
                    }
                    if(Object.keys(currentTrade).length){
                        if(currentTrade["from"] != undefined){
                            if(currentTrade["to"] != undefined){
                                document.getElementById("swap_btn").classList.remove("disabled"); 
                            }
                        }
                    }
                    // console.log(currentTrade)
                    // console.log(address); 
                    closeModal();
                });
                div.innerHTML = html;
                parent.appendChild(div);

                counter++;
            } else {
                ;
            }

            // div.onclick = (event) => {
            //     console.log(event.target.getAttribute("data-address"));
            //     console.log('test')
            // };

                // let address = event.target.getAttribute("data-address");
                // console.log(address);
                // currentTrade[currentTradeSide] = tokens[address];
                // console.log(currentTrade)
                
                // closeModal();
            
            // todo: place default icon if img return 500
        }
        console.log(`Counter: ${counter} (tokens available)`);
    }
    async function selectToken(){
        let address = (event) => event.target.getAttribute("data-address");
        console.log(address)
        closeModal();
    }
    async function swap(){
        let swapPrice =  document.getElementById("swap_price");
        // https://moralis.io/plugins/1inch/
        let quote = await Moralis.Plugins.oneInch.quote({
            chain: 'eth',    // todo: add more chains
            fromTokenAddress: fromTokenAddress,
            toTokenAddress: toTokenAddress,
            amount: parseInt(document.querySelector("#amount").value, 10),
        });
        let html = `
        Estimated gas: ${quote.estimatedGas} ${chain.toUpperCase()}
        You will swap: ${quote.fromTokenAmount} ${quote.fromToken.symbol}
        You will get: ${quote.toTokenAmount} ${quote.toToken.symbol}
        `;
        
        // Updating amounts in inputs
        let fromTokenValue = document.querySelector("#from_token");
        fromTokenValue.value = quote.fromToken.fromTokenAmount;
        let toTokenValue = document.querySelector("#to_token");
        toTokenValue.value = quote.toToken.toTokenAmount;

        console.log(quote);
        console.log(html);

        swapPrice.innerText = html;

        console.log('swap');
        alert('swap');
    }

    function openModal(side){
        // console.log('modal');
        switch(side){
            case "from":
                currentTradeSide = "from";
                // console.log(currentTradeSide);
                break;
            case "to":
                currentTradeSide = "to";
                // console.log(currentTradeSide);
                break;
        }
        init();
        document.querySelector("#modal").style.display = "block";
    }

    function closeModal(){
        // console.log("close");
        document.querySelector("#modal").style.display = "none";
    }

    return(
        <>
        <div id="container" className="mx-auto text-center">
            <div className="row">
                <div className="title text-black">DEX</div>
                    <div id="app" className="bg-light col-md-6 offset-md-3 d-block">
                        <div id="swapbox" className="">
                        <div id="success_message">
                            {/* Add success message */}
                        </div>
                        <div className="form_element">
                            <select className="mx-2 d-inline-block col-3" id="from_token_sel" placeholder="From Token" onClick={() => openModal("from")}></select>
                            <input className="mx-2 col-3 disabled" type="number" min="0" id="from_token" name="from_token" placeholder="From"></input>
                            <label id="from_token_label"></label>
                        </div>
                        <div className="form_element">
                            <select className="mx-2 d-inline-block col-3" id="to_token_sel" placeholder="To Token" onClick={() => openModal("to")}></select>
                            <input className="mx-2 col-3 disabled" type="number" min="0" id="to_token" name="to_token" placeholder="To"></input>
                            <label id="to_token_label"></label>
                        </div>
                        <div className="from_element">
                            <label id="amount_label">Amount:</label>
                            <input id="amount" type="number" placeholder="Select amount"></input>
                        </div>
                        <div id="swap_price">
                            {/* Update prices here */}
                        </div>
                        <div className="form_element">
                            <button className="col-6 btn btn-primary btn-lg btn-block disabled" id="swap_btn" onClick={swap}>Swap</button>
                        </div>
                        </div>

                        <h2>Test</h2>
                        <div className="form_element">
                            <select className="mx-2 d-inline-block col-3" id="from_token_sel" placeholder="From Token" onClick={() => openModal("from")} onChange={(e) => console.log(e)}></select>
                            <input className="mx-2 col-3 disabled" type="number" min="0" id="from_token" name="from_token" placeholder="From"></input>
                            <label id="from_token_label"></label>
                        </div>
                </div>
            </div>
        </div>
        
        <div id="modal" className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div id="token_list">...updating...</div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}
export default DEX;