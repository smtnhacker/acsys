<script>
    import ListEntry from "./ListEntry.svelte";
  
    const SAMPLE = [
      {
        status: "Incomplete",
        class: "A",
        name: "Simple Operators",
        code: "simple-op",
      },
      {
        status: "Complete",
        class: "A",
        name: "Conditionals",
        code: "if-else",
      },
      {
        status: "Incomplete",
        class: "B",
        name: "Peeta and Binary Search",
        code: "bsearch",
      },
      {
        status: "Complete",
        class: "C",
        name: "Tesseract and the Infinite Tsukuyomi",
        code: "tesseract",
      },
    ];
  
    let classID = "";
    let problems = [];

    $: problems = SAMPLE.filter(
      (problem) => 
        classID === "" || problem.class.toLowerCase() === classID.toLowerCase()
    )
  
  </script>
  
  <div>
    <div class="block">
      <h1 class="text-gray-300 text-5xl p-10">
        <span class="px-5 font-bold">ACSys</span>
        <span class="px-3">Problem List</span>
      </h1>
    </div>
    <div class="flex py-2 px-5 text-xl">
      <span class="text-gray-300 flex-none w-1/4">Status</span>
      <span class="text-gray-300 flex-none w-1/3">Name</span>
      <span class="text-gray-300 flex-none w-1/4">Code</span>
    </div>
    <div>
      {#each problems as problem (problem.code)}
        <div>
          <ListEntry
            status={problem.status}
            name={problem.name}
            classID={problem.class}
            code={problem.code}
            isEditable={true}
          />
        </div>
      {/each}
    </div>
  </div>