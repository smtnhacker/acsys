<script>
    export let problems;
    import ListEntry from "./ListEntry.svelte";

    $: console.log(problems)
  
    let classID = "";
    let shownProblems = [];

    $: shownProblems = problems.filter(
      (problem) => 
        classID === "" || problem.class_code.toLowerCase() === classID.toLowerCase()
    )
  
  </script>
  
  <div>
    <div class="block">
      <h1 class="text-gray-300 text-5xl p-10">
        <span class="px-5 font-bold">ACSys</span>
        <span class="px-3">Problem List</span>
      </h1>
    </div>
    <div class="flex">
      <div class="p-5">
        <span class="text-emerald-300">Class{" "}</span>
        <input
          type="text"
          name="class"
          placeholder="Class ID"
          bind:value={classID}
        />
      </div>
      <div class="my-5 px-3 rounded-xl bg-emerald-400">
        <a href="/problems/new">Add Problem</a>
      </div>
    </div>
    <div class="flex py-2 px-5 text-xl">
      <span class="text-gray-300 flex-none w-1/4">Status</span>
      <span class="text-gray-300 flex-none w-1/3">Name</span>
      <span class="text-gray-300 flex-none w-1/4">Code</span>
    </div>
    <div>
      {#each shownProblems as problem (problem.code)}
        <div>
          <ListEntry
            status={problem.status}
            name={problem.title}
            classID={problem.class_code}
            code={problem.code}
            isEditable={true}
          />
        </div>
      {/each}
    </div>
  </div>