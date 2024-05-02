<script lang="ts">
    import { onMount } from "svelte";
    import { connectToBlockchain } from "../helpers.ts";
    import Entries from "$lib/entries.svelte";
    import Add from "$lib/add.svelte";

    let provider;
    let geldContract: any;
    let visitorHasBrowserWallet = false;
    let publicWalletAddressOfVisitor = "";
    let visitorIsConnectedViaBrowserWallet = false;

    let logMessages: any[] = [];
    let showAddLogEntry = false;
    let showInfo = false;

    onMount(async () => {
        if (typeof window.ethereum === "undefined") {
            visitorHasBrowserWallet = false;
        } else {
            visitorHasBrowserWallet = true;
            await clickConnect(); // during test phase
        }
    });

    async function clickConnect() {
        if (publicWalletAddressOfVisitor === "") {
            const connectionData = await connectToBlockchain();
            provider = connectionData.provider;
            geldContract = connectionData.geldContract;
            publicWalletAddressOfVisitor =
                connectionData.publicWalletAddressOfVisitor;
        }
        visitorIsConnectedViaBrowserWallet = true;
    }
</script>

<div class="frame text-center">
    <p><br /></p>
    {#if visitorHasBrowserWallet}
        {#if !visitorIsConnectedViaBrowserWallet}
            <button on:click={() => clickConnect()}
                >Connect via Browserwallet</button
            >
        {/if}
    {:else}
        In order to load data from the blockchain you can utilize a
        browserwallet like <a href="https://metamask.io">Metamask</a>.
    {/if}

    {#if visitorIsConnectedViaBrowserWallet}
        <h2>Geo Cashing Log Book</h2>
        <p><br></p>
        <Entries {geldContract}></Entries>
        <p><br /></p>
        {#if showAddLogEntry}
            <Add {geldContract} {publicWalletAddressOfVisitor}></Add>
        {:else}
            <button on:click={() => (showAddLogEntry = !showAddLogEntry)}
                >Add Log Entry</button
            >
        {/if}
        <p><br /></p>
        <button on:click={() => (showInfo = !showInfo)}>Show Info</button>
        {#if showInfo}
            <div class="content">
                <p><br /></p>
                You can donate
                <a
                    href="https://polygonscan.com/token/0xb841a4f979f9510760ecf60512e038656e68f459"
                    target="_blank">Geo Cash</a
                >
                to the authors of Log Book Entries by adding an entry yourself.
                <p><br /></p>

                You can explore details around
                <a
                    href="https://polygonscan.com/token/0xb841a4f979f9510760ecf60512e038656e68f459"
                    target="_blank">Geo Cash</a
                >
                via
                <a
                    href="https://github.com/geo-logs/freiheit/blob/main/README.md"
                    target="_blank">the code repository</a
                >, via
                <a
                    href="https://www.geckoterminal.com/polygon_pos/pools/0x0296f6ea1f02083b99ae59200d00f5257473f17c"
                    target="_blank">geckoterminal.com</a
                >
                and via
                <a
                    href="https://polygonscan.com/token/0xb841a4f979f9510760ecf60512e038656e68f459"
                    target="_blank">polygonscan.com</a
                >.

                <p><br /></p>

                You can buy and sell
                <a
                    href="https://polygonscan.com/token/0xb841a4f979f9510760ecf60512e038656e68f459"
                    target="_blank">Geo Cash</a
                >
                via
                <a href="https://app.uniswap.org/swap" target="_blank"
                    >uniswap</a
                >
                utilizing the smart contract address of
                <a
                    href="https://polygonscan.com/token/0xb841a4f979f9510760ecf60512e038656e68f459"
                    target="_blank">Geo Cash</a
                >: 0xb841A4f979F9510760ecf60512e038656E68f459
                <p><br /></p>
            </div>
        {/if}
    {/if}
</div>

<style>
    .frame {
        width: 81vw;
        margin-left: auto;
        margin-right: auto;
    }
    .text-center {
        text-align: center;
    }

    :global(button) {
        min-width: 100%;
        width: 100%;
        text-decoration: none;
        display: block;
        display: inline-block;
        font-size: medium;
        font-weight: bold;
        padding: 10px;
        background-color: #3d6daf;
        color: white;
    }
    :global(button:hover) {
        cursor: pointer;
        filter: brightness(1.35);
    }

    :global(.myInputField) {
        font-size: medium;
        font-weight: bold;
        padding-top: 10px;
        padding-bottom: 10px;
        width: 100%;
    }
</style>
