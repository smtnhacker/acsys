<script>
    import { goto } from '$app/navigation'

    let formatterInput;
    let validatorInput;
    let modelSolutionInput;
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

      const toSubmit = new FormData();
      for (const key in formData) {
        toSubmit.append(key, formData[key]);
      }

      try {
        console.log("Submitting", toSubmit);
        const response = await fetch('http://localhost:8000/new_problem', {
          method: "POST",
          body: toSubmit
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
  
  <div class="flex h-screen text-gray-300">
    <div class="h-screen bg-[#042A38]">
      <form class="flex flex-row w-screen" on:submit={handleSubmit}>
        <div class="w-2/3">
          <h1 class="text-[7vh] w-2/3 flex flex-row">
            <div>
              <img class="image flex-none my-4 mx-3 hover:cursor-pointer" src="/back_icon.png"/>
            </div>
            <div>
              Create a New Problem
            </div>
          </h1>
          <label for="title" class="pt-3 px-[11vh] block">
            Problem Name
          </label>
          <input
              type="text"
              name="title"
              placeholder="Problem Name"
              bind:value={formData.title}
              class="w-4/5 shadow appearance-none border rounded py-1 px-1 mx-[11vh] block"
              required
            />
          <label for="code" class="pt-3 px-[11vh] block">
            Problem Code
          </label>
          <input
              type="text"
              name="code"
              placeholder="Problem Code"
              bind:value={formData.code}
              on:input={e=>formData.code = e.target.value.replace(/[^a-z\-\_]/gi, '')}
              class="w-4/5 shadow appearance-none border rounded py-1 mx-[11vh] block"
              required
            />
          <label for="subtasks" class="pt-3 px-[11vh] block">
            Subtasks
          </label>
          <input 
              type="number" 
              name="subtasks"
              min="1"
              max="100"
              bind:value={formData.subtasks}
              class="w-4/5 shadow appearance-none border rounded py-1 mx-[11vh] block"
              />
          <label for="description" class="pt-3 px-[11vh] block">
              <p>Problem Description:</p>
          </label>
          <textarea
              name="description"
              cols="30" rows="10"
              placeholder="Problem Description"
              bind:value={formData.description}
              class="w-4/5 shadow appearance-none border rounded py-1 mx-[11vh] block"
            ></textarea> 
        </div>
        <div class="w-1/3 h-screen bg-[#105F7C] content-center grid grid-cols-1">
          <label for="formatter" class="pt-3 block px-[10vh]">
            Formatter:  
          </label>
          <input
              type="file"
              name="formatter"
              bind:this={formatterInput}
              on:change={() => formData.formatter = formatterInput.files[0]}
              class="px-[10vh]"
            />  
          <label for="formatter" class="pt-3 block px-[10vh]">
              Model Solution:
          </label>
          <input
            type="file"
            name="model_solution"
            bind:this={modelSolutionInput}
            on:change={() => formData.model_solution = modelSolutionInput.files[0]}
            class="px-[10vh]"
          />
          <label for="generators" class="block pt-3 px-[10vh]">
            Test Generators:
          </label>
          <input
              type="file"
              name="generators"
              multiple
              bind:this={generatorsInput}
              on:change={() => formData.generators = generatorsInput.files[0]}
              class="block px-[10vh]"
            />
          <label for="testscript" class="block pt-3 px-[10vh]">
            Testscript
          </label>
          <textarea
              name="testscript"
              cols="30" rows="10"
              placeholder="Testscript"
              bind:value={formData.testscript}
              class="block w-3/4 mx-[10vh]"
            ></textarea>
          <label for="validator" class="block pt-3 px-[10vh]">
              Validator:
          </label>
          <input
              type="file"
              name="validator"
              bind:this={validatorInput}
              on:change={() => formData.validator = validatorInput.files[0]}
              class="block px-[10vh]"
            />
          <label class="block pt-3 px-[10vh] text-white">
              <input class="cursor-pointer bg-emerald-400 rounded-xl px-4 py-1" type="submit" value="CREATE">
          </label>
        </div>
      </form>
    </div>
  </div>

  <style>
    .image {
      width: 7vh;
      height: 7vh;
    }
  </style>