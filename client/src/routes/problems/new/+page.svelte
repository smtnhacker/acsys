<script>
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
  
    function handleChange(event) {
      const { name, value, type, files } = event.target;
  
      if (type === "file") {
        formData[name] = files[0];
      } else {
        formData[name] = type === "number" ? Number(value) : value;
      }
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      console.log("Submitted", formData);
    }
  </script>
  
  <div>
    <div><h1>ACSys | Create a New Problem</h1></div>
    <div>
      <form on:submit={handleSubmit}>
        <label for="title">
          <input
            type="text"
            name="title"
            placeholder="Problem Name"
            bind:value={formData.title}
            on:input={handleChange}
            required
          />
        </label>
        <label for="code">
          <input
            type="text"
            name="code"
            placeholder="Problem Code"
            bind:value={formData.code}
            on:input={handleChange}
            required
          />
        </label>
        <label for="timeLimit">
          <input
            type="number"
            name="timeLimit"
            placeholder="Time Limit (ms)"
            bind:value={formData.timeLimit}
            on:input={handleChange}
            min="100"
            max="10000"
          />
        </label>
        <label for="language">
          <select
            name="language"
            bind:value={formData.language}
            on:change={handleChange}
          >
            <option value="cpp">C++</option>
            <option value="python">Python</option>
          </select>
        </label>
        <label for="description">
          <textarea
            name="description"
            cols="30" rows="10"
            placeholder="Problem Description"
            bind:value={formData.description}
            on:input={handleChange}
          ></textarea>
        </label>
        <label for="scorer">
          <input
            type="file"
            name="scorer"
            on:change={handleChange}
          />
          {#if formData.scorer}
            <p>Scorer: {formData.scorer.name}</p>
          {/if}
        </label>
        <label for="generators">
          <input
            type="file"
            name="generators"
            multiple
            on:change={handleChange}
          />
          {#if formData.generators.length > 0}
            <p>Number of Generators: {formData.generators.length}</p>
          {/if}
        </label>
        <label for="generatorCode">
          <textarea
            name="generatorCode"
            cols="30" rows="10"
            placeholder="Generator Runner (bash)"
            bind:value={formData.generatorCode}
            on:input={handleChange}
          ></textarea>
        </label>
        <label for="validator">
          <input
            type="file"
            name="validator"
            on:change={handleChange}
          />
          {#if formData.validator}
            <p>Validator: {formData.validator.name}</p>
          {/if}
        </label>
      </form>
    </div>
  </div>