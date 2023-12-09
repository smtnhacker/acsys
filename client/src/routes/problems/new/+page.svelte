<script>
    let scorerInput;
    let validatorInput;
    let generatorsInput;

    let formData = {
      title: '',
      code: '',
      timeLimit: 2000,
      language: 'C++',
      description: '',
      scorer: null,
      generators: [],
      generatorCode: '',
      validator: null
    };
  
    function handleSubmit(event) {
      event.preventDefault();
      console.log("Submitted", formData);
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
        <label for="timeLimit">
            Time Limit (ms): 
          <input
            type="number"
            name="timeLimit"
            bind:value={formData.timeLimit}
            min="100"
            max="10000"
          />
        </label>
        <label for="language">
            Language: 
          <select
            name="language"
            bind:value={formData.language}
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
          </select>
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
        <label for="scorer">
            Scorer:
          <input
            type="file"
            name="scorer"
            bind:this={scorerInput}
            on:change={() => formData.scorer = scorerInput.files[0]}
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
        <label for="generatorCode">
          <textarea
            name="generatorCode"
            cols="30" rows="10"
            placeholder="Generator Runner (bash)"
            bind:value={formData.generatorCode}
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
      </form>
    </div>
  </div>