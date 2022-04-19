import { Divider } from "antd";

function Token(address, token){

    let div = document.createElement("div");
    div.setAttribute("data-address", address);
    div.className = "token_row";
    let html = `
    <img className="token_list_img" style="width:20px;" src=${token.logoURI}>
    <span className="token_list_text">${token.symbol}</span>
    `;
    return(
    <>
    <div className="token_row" data-address={address}>
        <img className="token_list_img"  src={token.logoURI}/>
        <span className="token_list_text">{token.symbol}</span>
    </div>
    </>
    )
}

export default Token;