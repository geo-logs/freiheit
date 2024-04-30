<script lang="ts">

    import { onMount } from "svelte";
    import Entry from "./entry.svelte";

    export let geldContract: any;

    let logMessages: any[] = [];
    let ready = false;

    onMount(async () => {
        await readLogMessages();
        ready = true;
    });

    async function readLogMessages() {
        const total = await geldContract.logEntryCounter();
        let counter = 0;
        let entry = {
            id: 0,
            from: "",
            message: "",
            priority: "",
            refersTo: "",
        };
        while (counter < total) {
            const resultRaw = await geldContract.tracesOfFreedom(counter);
            entry.id = counter;
            entry.from = resultRaw[0];
            entry.priority = resultRaw[1];
            entry.message = resultRaw[2];
            entry.refersTo = resultRaw[3];
            logMessages.push(Object.assign({}, entry));
            counter++;
        }
    }
</script>

<div class="tableDiv">
    {#if ready}
    <table>
        <tr>

            <th>Message</th>
        </tr>
            {#each logMessages as logMessage}
                <Entry {logMessage}></Entry>
            {/each}
        </table>
        {:else}
            ... Loading data from Blockchain ... 
        {/if}
</div>

<style>
    .tableDiv {
        overflow-x: scroll;
    }
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td,
    th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
</style>
