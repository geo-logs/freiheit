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

    onMount(async () => {
        if (typeof window.ethereum === "undefined") {
            visitorHasBrowserWallet = false;
        } else {
            visitorHasBrowserWallet = true;
            await clickConnect() // during test phase
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
    <h1>Geo Log</h1>

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
        <Entries {geldContract}></Entries>
        <p><br /></p>
        {#if showAddLogEntry}
            <Add {geldContract} {publicWalletAddressOfVisitor}></Add>
        {:else}
            <button on:click={() => (showAddLogEntry = !showAddLogEntry)}
                >Add Log Entry</button
            >
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
