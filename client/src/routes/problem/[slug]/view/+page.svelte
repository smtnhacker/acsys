<script>
    export let data;
    let attemptInput;
    let score = 0;
    let hasScore = false;

    let problems = [
        {
            title: "SUM OF TWO SEQUENCES",
            statement: "Attack feet behind the couch destroy couch flop over give attitude hide when guests come over hopped up on goofballs, hunt anything that moves lick butt chase mice flop over swat at dog. Flop over give attitude  rub face on everything all of a sudden go crazy hunt anything that moves attack feet flop over hide when guests come over destroy couch swat at dog hopped up on goofballs  stand in front of the computer screen , bag stretch chase mice chase imaginary bugs  intrigued by the shower lick butt behind the couch  sweet beast under the bed leave dead animals as gifts inspect anything brought into the house, hunt anything that moves leave dead animals as gifts behind the couch give attitude inspect anything brought into the house sweet beast under the bed lick butt  rub face on everything hopped up on goofballs  intrigued by the shower. <br><br> Flop over destroy couch  give attitude inspect anything brought into the house behind the couch swat at dog leave dead animals as gifts bag stretch, hunt anything that moves all of a sudden go crazy  stand in front of the computer screen  lick butt  intrigued by the shower  rub face on everything chase imaginary bugs flop over sweet beast under the bed, hopped up on goofballs chase mice hide when guests come over attack feet give attitude all of a sudden go crazy sweet beast under the bed. Hunt anything that moves flop over bag stretch inspect anything brought into the house  destroy couch  stand in front of the computer screen  chase mice, attack feet swat at dog leave dead animals as gifts hide when guests come over give attitude behind the couch chase imaginary bugs sweet beast under the bed, flop over hopped up on goofballs lick butt  rub face on everything  intrigued by the shower all of a sudden go crazy.",
            language: "Python",
            time: "20s",
            memory: "500mb",
        },
    ]
    
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

<div class="flex h-screen text-gray-300">
    <div class="flex-none w-3/4 h-screen bg-[#042A38] py-6 px-8 overflow-y-auto">
        <div class="mb-[5vh]">
            <button>back</button>
            <span class="text-[7vh]">{problems[0].title}</span>
        </div>
        <div class="text-justify text-[3vh]">
            <p>{@html problems[0].statement}</p>
        </div>
    </div>
    <div class="flex-none w-1/4 bg-[#105F7C] p-5">
        <div>
            <a href="./">Home</a>
        </div>
        <div class="my-11">
            <p>Language: {problems[0].language}</p>
            <p>Time Limit: {problems[0].time}</p>
            <p>Memory Limit: {problems[0].memory}</p>
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