<script>
    export let data;
    let attemptInput;
    let score = 0;
    let hasScore = false;
    
    async function handleSubmit(event) {
        event.preventDefault();
        const toSubmit = new FormData();
        toSubmit.append('attempt', attemptInput.files[0])

        try {
            console.log("Submitting", toSubmit);
            const response = await fetch(`http://localhost:8000/${data.slug}/submit`, {
                method: "POST",
                body: toSubmit
            })
            data = await response.json()
    
            if (response.ok && data.status === 'success') {
                hasScore = true;
                score = Array.from(data.submission).reduce((item, total) => total + item, 0) / Array.from(data.submission).length;
            } else {
                console.error("Upload Failed")
            }
        } catch (err) {
            console.error('An error occurred', err)
        }
    }

</script>

<div>
    <p>
        {data.slug}
    </p>

    <form on:submit={handleSubmit}>
        <input 
            type="file" 
            name="attempt"
            bind:this={attemptInput}>
        <input
            class="cursor-pointer" 
            type="submit" 
            value="Submit">
    </form>
    {#if hasScore}
        You got a score of {score}.
    {/if}
</div>