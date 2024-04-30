import { ethers } from 'ethers';
import { Geld, geldABI, targetChainId } from './constants';

export const getTextWithoutLink = (text: string, link: string) => {
    const startIndex = text.indexOf(link);
    const endIndex = startIndex + link.length;
    const part1 = text.substr(0, text.indexOf(link));
    const part2 = text.substr(endIndex, text.length);
    return `${part1}${part2}`;
}

export const replaceContentToShowClickableLinks = (content: any) => {

    if (content !== undefined && content.length >= 9 && content.indexOf('http:') === -1) {
        var exp_match =
            /(\b(https?|):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
        var element_content = content.replace(
            exp_match,
            `<a class="linkInText" href='$1' target="_blank">$1</a>`
        );
        var new_exp_match = /(^|[^\/])(www\.[\S]+(\b|$))/gim
        var new_content = element_content.replace(
            new_exp_match,
            '$1<a class="linkInText" target="_blank" href="http://$2">$2</a>'
        )
        return new_content
    }

    return content

}

export const connectToBlockchain = async () => {
    let connectionData = {
        provider: {},
        geldContract: {},
        visitorIsConnectedViaBrowserWallet: false,
        publicWalletAddressOfVisitor: ""
    }
    try {
        const chainId = await window.ethereum.request({
            method: 'eth_chainId'
        });

        if (chainId !== targetChainId) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: targetChainId }]
                });
            } catch (error) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: targetChainId,
                            chainName: 'Polygon Mainnet',
                            rpcUrls: ['https://polygon.drpc.org'],
                            nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
                            blockExplorerUrls: ['https://polygonscan.com']
                        }
                    ]
                });
            }
        }
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        connectionData.provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await (connectionData.provider as any).getSigner();
        connectionData.geldContract = new ethers.Contract(Geld, geldABI, signer);
        connectionData.publicWalletAddressOfVisitor = accounts[0];
        window.ethereum.on('chainChanged', handleChainChanged);
        connectionData.visitorIsConnectedViaBrowserWallet = true;
    } catch (error) {
        alert(error.message);
    }
    window.ethereum.on('accountsChanged', function (accounts: any[]) {
        alert(`the account has been changed via Metamask. So I reload.`);
        window.location.reload();
    });

    return connectionData
}

export const handleChainChanged = (chainId: any) => {
    // await connectToBlockchain()
    alert(`the chain has been changed via Metamask. So I reload.`);
    window.location.reload();
}