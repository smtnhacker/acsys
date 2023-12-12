<script>
    import TeacherProblemList from "./TeacherProblemList.svelte";
    import StudentProblemList from "./StudentProblemList.svelte";
    let user = "Student";
</script>
<div class="container h-screen bg-slate-800">
    {#if user == "Student"}
        <StudentProblemList />
    {:else}
        <TeacherProblemList />
    {/if}
</div>