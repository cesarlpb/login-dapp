import Modal from "./Modal";
import styles from "./DEX.css";
import { Moralis } from 'moralis';

function DEX(){

    async function init(){
        await Moralis.initPlugins();
        // await Moralis.enable();
        await listAvailableTokens();
    }

    async function listAvailableTokens(){
        const result = await Moralis.Plugins.oneInch.getSupportedTokens({
            chain: 'eth', // Todo: set more chains
        });
        // console.log(result.tokens);
        const tokens = result.tokens;
        let parent = document.getElementById("token_list");
        parent.innerHTML = '';
        for(const address in tokens){
            let token = tokens[address];
            let div = document.createElement("div");
            div.className = "token_row";
            let html = `
            <img className="token_list_img" style="width:20px;" src=${token.logoURI}>
            <span className="token_list_text">${token.symbol}</span>
            `
            // todo: place default icon if img return 500
            div.innerHTML = html;
            parent.appendChild(div);
        }
        console.log('ready');
    }
    function swap(){
        console.log('swap');
    }

    function openModal(){
        console.log('modal');
        init();
        document.querySelector("#modal").style.display = "block";
    }

    function closeModal(){
        console.log("close");
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
                        </div>
                        <div className="form_element">
                            <select className="mx-2 d-inline-block col-3" id="from_token_sel" onClick={openModal}>ETH</select>
                            <input className="mx-2 col-3" type="number" min="0" id="from_token" name="from_token" placeholder="From"></input>
                        </div>
                        <div className="form_element">
                            <select className="mx-2 d-inline-block col-3" id="to_token_sel" onClick={openModal}>ETH</select>
                            <input className="mx-2 col-3" type="number" min="0" id="to_token" name="to_token" placeholder="To"></input>
                        </div>
                        <div className="form_element">
                            <button className="col-6 btn btn-primary btn-lg btn-block" id="swap_btn" onClick={swap}>Swap</button>
                        </div>
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