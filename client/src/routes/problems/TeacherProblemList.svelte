<script>
    import { onMount } from "svelte";
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
  
    function handleClassIDChange(event) {
      classID = event.target.value;
    }
  
    function filterProblems() {
      problems = SAMPLE.filter(
        (problem) =>
          classID === "" || problem.class.toLowerCase() === classID.toLowerCase()
      );
    }
  
    onMount(filterProblems);
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
        on:input={handleClassIDChange}
      />
      <button>New Problem</button>
    </div>
    <div>
      {#each problems as problem (problem.code)}
        <li>
          <ListEntry
            name={problem.name}
            classID={problem.class}
            code={problem.code}
            isEditable={true}
          />
        </li>
      {/each}
    </div>
  </div>