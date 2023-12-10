<script>
  import { goto } from '$app/navigation'

  let formData = {
    email: "",
    password: "",
    isTeacher: true,
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
    goto('/dashboard')
  }
</script>

<div class="text-center bg-slate-800 h-screen">
  <div class="header bg-emerald-300 text-5xl font-extrabold text-cyan-800 p-6 ">ACSys</div>
  <div class="container bg-gray-300 w-1/2 absolute left-1/4 h-2/3 rounded-t-3xl bottom-0">
    <form class="w-full h-full flex flex-col justify-around py-10" on:submit={handleSubmit}>
      <h2 class="text-4xl font-bold text-slate-800">Login</h2>
      <div class='flex flex-col justify-around h-1/3'>
        <label for="email">
          <input
            class="min-w-[200px] w-1/2 py-1 px-4 placeholder-cyan-800 rounded-md"
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
            class="min-w-[200px] w-1/2 py-1 px-4 placeholder-cyan-800 rounded-md"
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
      </div>
      <label>
        <input class="cursor-pointer bg-cyan-800 text-white px-10 py-1 rounded-3xl text-lg" type="submit" value="Login" />
      </label>
    </form>
  </div>
</div>