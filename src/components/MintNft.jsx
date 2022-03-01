import { Moralis } from 'moralis';
import env from "react-dotenv";
import styles from './MintNft.css';

function MintNft(){

/** Connect to Moralis server */
const appId = env.APP_ID;
const serverUrl = env.SERVER_URL;

Moralis.start({ serverUrl, appId });
let user = Moralis.User.current();

/** Add from here down */
async function login() {
  if (!user) {
   try {
      user = await Moralis.authenticate({ signingMessage: "Hello World!" })
      initApp();
   } catch(error) {
     console.log(error)
   }
  }
  else{
    Moralis.enableWeb3();
    initApp();
  }
}

function initApp(){
    document.querySelector("#app").style.display = "block";
    document.querySelector("#submit_button").onclick = submit;
 }

async function submit(){
    const input = document.querySelector('#input_image');
    let data = input.files[0]
    const imageFile = new Moralis.File(data.name, data)
    await imageFile.saveIPFS();
    let imageHash = imageFile.hash();

    let metadata = {
        name: document.querySelector('#input_name').value,
        description: document.querySelector('#input_description').value,
        image: "/ipfs/" + imageHash
    }
    console.log(metadata);
    const jsonFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metadata))});
    await jsonFile.saveIPFS();

    let metadataHash = jsonFile.hash();
    console.log(jsonFile.ipfs())
    let res = await Moralis.Plugins.rarible.lazyMint({
        chain: 'rinkeby',
        userAddress: user.get('ethAddress'),
        tokenType: 'ERC721',
        tokenUri: 'ipfs://' + metadataHash,
        royaltiesAmount: 5, // 0.05% royalty. Optional
    })
    console.log(res);
    document.querySelector('#success_message').innerHTML = 
        `NFT minted. <a href="https://rinkeby.rarible.com/token/${res.data.result.tokenAddress}:${res.data.result.tokenId}">View NFT`;
    document.querySelector('#success_message').style.display = "block";
    setTimeout(() => {
        document.querySelector('#success_message').style.display = "none";
    }, 5000)
}

login();

    return(
        <div id="container" className="mx-auto text-center">
            <div className="row">
                <div className="title text-black">NFT Minter</div>
                    <div id="app" className="col-md-6 offset-md-3">
                        <div id="success_message">
                        </div>
                        <div className="form_element">
                            <input className="form-control" type="text" id="input_name" name="name" placeholder="Token name"></input>
                        </div>
                        <div className="form_element">
                            <input className="form-control" type="text" id="input_description" name="description" placeholder="Description"></input>
                        </div>
                        <div className="form_element">
                            <input className="form-control" type="file" id="input_image" name="image" accept="image/png, image/jpeg"></input>
                        </div>
                        <div className="form_element">
                            <button className="btn btn-primary btn-lg btn-block" id="submit_button" onClick={submit}>Submit</button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default MintNft;