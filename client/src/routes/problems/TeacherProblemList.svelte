<script>
    import ListEntry from "./ListEntry.svelte";
  
    const SAMPLE = [
      {
        class: "A",
        name: "Simple Operators",
        code: "simple-op",
      },
      {
        class: "A",
        name: "Conditionals",
        code: "if-else",
      },
      {
        class: "B",
        name: "Peeta and Binary Search",
        code: "bsearch",
      },
      {
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
    <div>
      <h1>ACSys | Problem List</h1>
    </div>
    <div>
      Class:{" "}
      <input
        type="text"
        name="class"
        placeholder="Class ID"
        bind:value={classID}
      />
      <a href="/problems/new">New Problem</a>
    </div>
    <div>
      {#each problems as problem (problem.code)}
        <div>
          <ListEntry
            name={problem.name}
            classID={problem.class}
            code={problem.code}
            isEditable={true}
          />
        </div>
      {/each}
    </div>
  </div>