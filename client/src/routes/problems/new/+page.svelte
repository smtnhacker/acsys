<script>
    import { goto } from '$app/navigation'

    let formatterInput;
    let validatorInput;
    let generatorsInput;

    let formData = {
      title: '',
      code: '',
      description: '',
      subtasks: 1,
      model_solution: null,
      testscript: '',
      generators: [],
      validator: null,
      formatter: null
    };
  
    async function handleSubmit(event) {
      event.preventDefault();

      try {
        console.log("Submitting", formData);
        const response = await fetch('http://127.0.0.1:8000/new_problem', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title: "wow", code: "hello" }),
          mode: "cors"
        })
        console.log(await response.json())
  
        if (response.ok) {
          goto(`/problem/${formData.code}/view`);
        } else {
          console.error("Upload Failed")
        }
      } catch (err) {
        console.error('An error occurred', err)
      }

    }
  </script>
  
  <div>
    <div><h1>ACSys | Create a New Problem</h1></div>
    <div>
      <form class="flex flex-col" on:submit={handleSubmit}>
        <label for="title">
          <input
            type="text"
            name="title"
            placeholder="Problem Name"
            bind:value={formData.title}
            required
          />
        </label>
        <label for="code">
          <input
            type="text"
            name="code"
            placeholder="Problem Code"
            bind:value={formData.code}
            required
          />
        </label>
        <label for="subtasks">
          Subtasks
          <input 
            type="number" 
            name="subtasks"
            min="1"
            max="100"
            bind:value={formData.subtasks}>
        </label>
        <label for="description">
            <p>Problem Description:</p>
          <textarea
            name="description"
            cols="30" rows="10"
            placeholder="Problem Description"
            bind:value={formData.description}
          ></textarea>
        </label>
        <label for="formatter">
            Formatter:
          <input
            type="file"
            name="formatter"
            bind:this={formatterInput}
            on:change={() => formData.formatter = formatterInput.files[0]}
          />    
        </label>
        <label for="generators">
            Test Generators:
          <input
            type="file"
            name="generators"
            multiple
            bind:this={generatorsInput}
            on:change={() => formData.generators = generatorsInput.files}
          />
        </label>
        <label for="testscript">
          <textarea
            name="testscript"
            cols="30" rows="10"
            placeholder="Testscript"
            bind:value={formData.testscript}
          ></textarea>
        </label>
        <label for="validator">
            Validator:
          <input
            type="file"
            name="validator"
            bind:this={validatorInput}
            on:change={() => formData.validator = validatorInput.files[0]}
          />
        </label>
        <label>
            <input class="cursor-pointer" type="submit" value="Create New Problem">
        </label>
      </form>
    </div>
  </div>