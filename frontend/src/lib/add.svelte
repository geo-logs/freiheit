<script lang="ts">
    import { onMount } from "svelte";
    import { Geld } from "../constants.js";

    export let geldContract: any;
    export let publicWalletAddressOfVisitor = "";

    let logMessage: any;
    let priority: any;
    let refersTo = 0;
    let allowance = 0;
    let ready = false;
    let tx: any;
    let showPleaseReload = false;

    onMount(async () => {
        allowance = await geldContract.allowance(
            publicWalletAddressOfVisitor,
            Geld,
        );
        ready = true;
    });
    async function approve() {
        alert(
            `approving ${Geld} to spend ${priority} Geld from ${publicWalletAddressOfVisitor}`,
        );
        tx = await geldContract.approve(Geld, BigInt(priority * 10 ** 18));
        showPleaseReload = true;
    }
    async function log() {
        alert(
            `logging ${logMessage} with a priority of ${priority} referring to ${refersTo}`,
        );
        tx = await geldContract.log(
            BigInt(priority * 10 ** 18),
            logMessage,
            refersTo,
            false,
        );
        showPleaseReload = true;
    }
</script>

<p><br /></p>
{#if showPleaseReload}
    You can observe your transaction via <a
        href="https://polygonscan/tx/{tx.hash}">https://polygonscan/tx/{tx.hash}</a
    >
    <p><br /></p>
    Please reload after some seconds to see the result of your transaction.
    <p><br /></p>
    <button on:click={() => window.location.reload()}>Reload</button>
{:else}
    <!-- svelte-ignore a11y-autofocus -->
    <input
        bind:value={priority}
        class="myInputField"
        type="number"
        placeholder="... enter a donation amount ..."
        autofocus
    />
    <p><br /></p>
    {#if allowance > 0}
        <input
            bind:value={logMessage}
            class="myInputField"
            type="text"
            placeholder="... enter your log message ..."
        />
    {/if}
    <p></p>

    {#if priority > 0}
        {#if allowance == 0}
            <button on:click={() => approve()}>Approve {priority} Geld</button>
            <p><br /></p>
        {:else}
            <button on:click={() => log()}>Log</button>
        {/if}
    {/if}
{/if}

<style>
</style>
