<script>
    export let data;

    import SvelteMarkdown from 'svelte-markdown';

    let attemptInput;
    let score = 0;
    let hasScore = false;

    let problem = {
        ...data.details,
        language: "Python",
        time: "2s",
        memory: "500mb"
    }
    
    async function handleSubmit(event) {
        event.preventDefault();
        const toSubmit = new FormData();
        toSubmit.append('attempt', attemptInput.files[0])

        try {
            console.log("Submitting", toSubmit);
            const response = await fetch(`http://localhost:8000/${problem.code}/submit`, {
                method: "POST",
                body: toSubmit
            })
            const res_data = await response.json()
    
            if (response.ok && res_data.status === 'success') {
                hasScore = true;
                score = Array.from(res_data.submission).reduce((item, total) => total + item, 0) / Array.from(res_data.submission).length;
            } else {
                console.error("Upload Failed")
            }
        } catch (err) {
            console.error('An error occurred', err)
        }
    }

</script>

<div class="flex h-screen text-gray-300">
    <div class="flex-none w-3/4 h-screen bg-[#042A38] py-6 px-8 overflow-y-auto">
        <div class="mb-[5vh]">
            <button>back</button> <br/>
            <span class="text-[7vh]">{problem.title}</span>
        </div>
        <div class="text-justify text-[3vh]">
            <p>
                <SvelteMarkdown source={problem.statement} />
            </p>
        </div>
    </div>
    <div class="flex-none w-1/4 bg-[#105F7C] p-5">
        <div>
            <a href="./">Home</a>
        </div>
        <div class="my-11">
            <p>Language: {problem.language}</p>
            <p>Time Limit: {problem.time}</p>
            <p>Memory Limit: {problem.memory}</p>
        </div>
        <div>
            <form on:submit={handleSubmit}>
                    <div class="relative border border-dashed border-gray-300 p-6 rounded-md text-center bg-gray-200">
                        <input type="file" id="fileInput" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" bind:this={attemptInput}>
                        <div class="flex flex-col items-center">
                            <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7l4-4m0 0l4 4m-4-4v14"></path></svg>
                            <p class="text-sm text-gray-600">Drag and drop your file here or</p>
                            <button type="button" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 ease-in-out">
                            Browse
                            </button>
                        </div>
                    </div>
                <input
                    class="cursor-pointer rounded-3xl bg-emerald-500 py-1 px-4 text-gray-950 my-2" 
                    type="submit" 
                    value="Submit">
            </form>
            {#if hasScore}
                You got a score of {score}.
            {/if}
        </div>
    </div>
    
</div>
<style>
    :root {
        --problem-submission-color: rgb(16, 95, 124);
    }
</style>