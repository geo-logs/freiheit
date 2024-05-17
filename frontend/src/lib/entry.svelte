<script>
    import { ethers } from "ethers";
    import { replaceContentToShowClickableLinks } from "../helpers";
    export let logMessage;

    let showDetail = false;
</script>

<tr on:click={() => (showDetail = !showDetail)}>
    <td
        >{@html replaceContentToShowClickableLinks(logMessage.message)} (donated
        {ethers.formatEther(logMessage.priority)} Geo Cash)</td
    >
    <!-- <td>{ethers.formatEther(logMessage.priority)}</td> -->
</tr>

{#if showDetail}
    <p></p>
    <div class="detailsTableDiv">
        <table>
            <th> Key </th>
            <th> value </th>
            <tr>
                <td>ID</td>
                <td>{logMessage.id}</td>
            </tr>
            <tr>
                <td>From</td>
                <td>{logMessage.from}</td>
            </tr>
            <tr>
                <td>Donation</td>
                <td>{ethers.formatEther(logMessage.priority)} Geld</td>
            </tr>
            <tr>
                <td>Message</td>
                <td
                    >{@html replaceContentToShowClickableLinks(
                        logMessage.message,
                    )}</td
                >
            </tr>
            <tr>
                <td>Refers To</td>
                <td>{logMessage.refersTo}</td>
            </tr>
        </table>
    </div>
    <p></p>
{/if}

<style>
    .detailsTableDiv {
        max-width: 100%;
        width: 100vw;
        max-width: 100vw;
    }
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
        max-width: fit-content;
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
