<script>
    export let space = '';
    export let winner;
    $: won = winner != undefined && winner === space;
</script>
<style>
    .space{
        border: solid 1px gray;
        height: 125px;
        width: 125px;
        flex: 1;
        font-size: 75px;
        text-align: center;
        line-height: 125px;
        cursor: pointer;
    }
    .winner{
        color: purple;
    }
</style>
<div class="space" class:winner={won} on:click>
    {space}
</div>