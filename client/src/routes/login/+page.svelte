<script>
  let formData = {
    email: "",
    password: "",
    isTeacher: false,
  };

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    formData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted", formData);
  }
</script>

<div>
  <div class="header">ACSys</div>
  <div>
    <form on:submit={handleSubmit}>
      <h2>Login</h2>
      <label for="email">
        <input
          type="email"
          name="email"
          placeholder="Email"
          bind:value={formData.email}
          on:input={handleChange}
          required
        />
      </label>
      <label for="password">
        <input
          type="password"
          name="password"
          placeholder="Password"
          bind:value={formData.password}
          on:input={handleChange}
          required
        />
      </label>
      <label for="isTeacher">
        Are you a teacher?
        <input
          type="checkbox"
          name="isTeacher"
          bind:checked={formData.isTeacher}
          on:change={handleChange}
        />
      </label>
      <input type="submit" value="Login" />
    </form>
  </div>
</div>