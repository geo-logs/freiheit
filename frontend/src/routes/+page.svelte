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
    let showContact = false;

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
        <h2>Geo Caching Log Book</h2>
        <p><br /></p>
        Please communicate with respect for all people. 
        <p><br /></p>
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
        <button on:click={() => (showInfo = !showInfo)}>Features</button>
        {#if showInfo}
            <div class="content">
                <p><br /></p>
                You can donate
                <a
                    href="https://polygonscan.com/token/0xb841a4f979f9510760ecf60512e038656e68f459"
                    target="_blank">Geo Cash</a
                >
                to the authors of Log Book Entries while adding Geo Log Entries yourself.
                The programmers and operators of this project are already free. So
                if some of us receive donations, we'll donate them further. You can validate this e.g. via 
                <a href="https://polygonscan.com/token/0xb841a4f979f9510760ecf60512e038656e68f459" target="_blank">polygonscan.com</a>.
                <p><br /></p>

                You can explore details around our freedom currencies via
                several entry points e.g.
                <a href="https://FreedomCash.org" target="_blank"
                    >FreedomCash.org</a
                >,
                <a href="https://Geo-Caching.org" target="_blank"
                    >Geo-Caching.org</a
                >
                <a href="https://Freiheitsgeld.de" target="_blank"
                    >Freiheitsgeld.de</a
                >,
                <a href="https://privacy-is-not-a-crime.de" target="_blank"
                    >privacy-is-not-a-crime.de</a
                >.

                <p><br /></p>
                This is an educational
                <a
                    href="https://github.com/geo-logs/freiheit/blob/main/README.md"
                    target="_blank">open source</a
                >
                project. Please contribute to free the world.

                <p><br /></p>
            </div>
        {/if}

        <p><br /></p>
        <button on:click={() => (showContact = !showContact)}
            >Contact / Imprint</button
        >
        {#if showContact}
            <p><br /><br /></p>
            Es handelt sich bei unserem Projekt nicht um ein gewerbliches Projekt
            sondern um ein 
            <a
                href="https://github.com/geo-logs/freiheit/blob/main/README.md"
                target="_blank">Open Source</a
            >
            Bildungsprojekt ohne Gewinnerzielungsabsicht unsererseits. Wir sind bereits
            frei. Aus diesem Grund verzichten wir auf ein
            <a
                href="https://www.youtube.com/watch?v=I6jaruQuBhM"
                target="_blank"
            >
                klassisches Impressum</a
            >.
            <p><br /><br><br></p>

            <b> Keine Abmahnung ohne Kontakt! </b>
            <p></p>
            Sollte der Inhalt fremde Rechte Dritter oder gesetzliche Bestimmungen
            verletzen, kontaktieren Sie uns ohne Kostennote. Wir stellen nach bestem Wissen und Gewissen sicher, dass
            zurecht beanstandete Inhalte unverzüglich entfernt werden, ohne dass
            von Ihrer Seite die Einschaltung eines Rechtsbeistandes erforderlich
            ist. Dennoch von Ihnen ohne vorherige Kontaktaufnahme ausgelöste Kosten
            werden im Sinne der Schadensminderungspflicht zurückgewiesen und gegebenenfalls
            wird Gegenklage wegen Verletzung vorgenannter Bestimmungen eingereicht. 
            <p><br></p>
            Sofern Sie ein Abmahnanwalt sind und bereit sind einer möglicherweise noch wertvolleren Berufung zu folgen, laden wir Sie ein kostenlos für uns zu prüfen inwieweit es rechtlich zulässig ist ein dezentrales, smart contract basiertes Content Moderationssystem für 
            <a href="https://freedomlog.de" target="_blank">Freedomlog.de</a> einzuführen. <p></p> Prototypisch haben wir ein solches im Rahmen eines Smart Contracts namens <a href="https://github.com/moniquebaumann/freedom-tribunal/blob/main/freedom-tribunal.sol" target="_blank">FreedomTribunal</a> implementiert. 

            <p><br></p>
            Unsere <a href="https://github.com/moniquebaumann/friends-of-satoshi" target="_blank">Familie</a> aus Open Source Programmierern für Freiheit, Friede und Gerechtigkeit bearbeiten gerne wertvolle Kontaktanfragen per <a href="https://github.com/geo-logs/freiheit/issues/new" target="_blank">GitHub</a>.
            <p><br /></p>
        {/if}
    {/if}
    <p><br /><br /><br /></p>
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
