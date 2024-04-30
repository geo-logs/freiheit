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
        const tx = await geldContract.approve(
            Geld,
            BigInt(priority * 10 ** 18),
        );
        await tx.wait();
    }
    async function log() {
        alert(
            `logging ${logMessage} with a priority of ${priority} referring to ${refersTo}`,
        );
        await geldContract.log(
            BigInt(priority * 10 ** 18),
            logMessage,
            refersTo,
            false
        );
    }
</script>

<p><br /></p>
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

<style>
</style>
