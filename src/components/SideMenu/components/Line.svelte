<script>
    import { activeLineSt } from "../../../stores/canvas";

    export let line;

    $: colorSt = line.colorSt;
    $: nameSt = line.nameSt;

    $: console.log($activeLineSt)
</script>

<div 
    class="line" 
    class:active={$activeLineSt == line.id}
    on:click={() => $activeLineSt = line.id}
>
    <span class="box" style="--col: {$colorSt}"></span>    
    <span>{$nameSt}</span>
</div>

<style>
    .line {
        display: flex;
        background: none;
        padding: 5px 10px;
        align-items: center;
        cursor: pointer;
    }
    
    .active {
        background: #0002;
        cursor: inherit;
    }
    
    .box {
        height: 15px;
        width: 15px;
        background: hsl(var(--col), 50%, 50%);
        margin-right: 10px;
    }
</style>