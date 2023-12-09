<script>
    export let name;
    export let classID;
    // export let code;
    export let isEditable;
</script>
  
<div>
{#if isEditable}
    <div>{name} | Class {classID} <button>Edit</button></div>
{:else}
    <div>{name} | Class {classID}</div>
{/if}
</div>