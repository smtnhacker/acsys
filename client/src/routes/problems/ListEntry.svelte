<script>
    export let name;
    export let classID;
    export let status;
    // export let code;
    export let isEditable;
</script>
  
<div class="px-7 py-4 bg-gray-100 mx-10 my-3 rounded-md">
{#if isEditable}
    <div class="flex p-2 w-5/6 text-lg">
        <div class="flex-none w-1/4">
            {#if status == 'Incomplete'}
                <span class="text-gray-300 px-8 py-1 bg-emerald-700 rounded-xl">{status}</span>
            {:else}
                <span class="text-gray-300 px-8 py-1 bg-emerald-400 rounded-xl">{status}</span>
            {/if}
        </div>

        <span class="text-slate-800 flex-none w-1/2">{name}</span>
        <span class="text-slate-800 flex-none w-1/4">{classID}</span>
    </div>
{:else}
    <div>{status} | {name} | Class {classID}</div>
{/if}
</div>