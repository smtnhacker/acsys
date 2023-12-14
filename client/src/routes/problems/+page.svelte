<script>
    export let data;
    import TeacherProblemList from "./Components/TeacherProblemList.svelte";
    import StudentProblemList from "./Components/StudentProblemList.svelte";
    let user = "Teacher";
</script>
<div class="container h-screen bg-slate-800">
    {#if user == "Student"}
        <StudentProblemList problems={data.problems} />
    {:else}
        <TeacherProblemList problems={data.problems} />
    {/if}
</div>