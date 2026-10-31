<!--
GA5 README template.
- Add your answers to each question's section below.
- For each question where we want you to add your commands,
  put the command(s) you ran in the terminal in the corresponding ```bash code block.
- Where we want to see a command's output, there is a plain ``` code block
  right below the command block: paste the output there.
- The code to run each step of the workflow goes in `protocol.md`, not here:
  you don't need to repeat it in this file.
- You don't need to paste the contents of your scripts into this file:
  we will look at the scripts in your `scripts` dir directly
  (so make sure you commit them!).
- Delete instructional comments like this one as you go.
-->

# GA5 answers - <your-name>

------------------------------------------------------------------------

## Part A: Your project dir, Git repo, and protocol

### 1: Create subdirs, and copy the scripts

<!-- No command/output needed. -->

### 2: Initialize a Git repository, and commit your first files

<!-- No command/output needed here -- we check the repo directly. -->

### 3: Fill in the top of the protocol

<!-- No command/output needed here -- we check `protocol.md` directly. -->

### 4: Download the reference transcriptome

<!-- Put the download command in `protocol.md`, not here. -->

Code to count the number of transcripts:

```bash
# Your command:
```

The output of the command was:

```
```

*Answer*: The number of transcripts in the file:

------------------------------------------------------------------------

## Part B: Read trimming

### 6: Run TrimGalore

<!-- Put the code to run TrimGalore in `protocol.md`, not here. -->

*Answer*: The number of batch jobs you submitted, whether they all succeeded,
and how you checked that:

### 7: Find Slurm log files without the "Successfully finished" line

```bash
# Your command:
```

The output of the command was:

```
```

*Answer*: How you checked that your command works:

### 8: Resource usage of a TrimGalore job

```bash
# Your command:
```

The output of the command was:

```
```

*Answer*: The CPU efficiency and memory usage:

*Answer*: Would you change the number of cores for this script, and why (not)?

------------------------------------------------------------------------

## Part C: Transcript quantification with Salmon

### 9: Create the Salmon index

Code to check the size of the index dir:

```bash
# Your command:
```

The output of the command was:

```
```

*Answer*: How long it took to create the index, and how you found out:

*Answer*: The size of the index dir:

### 10: Run Salmon for all samples

<!-- No command/output needed here -- we check `protocol.md` directly. -->

### 11: Salmon's `quant.sf` output file

*Answer*: What the `TPM` and `NumReads` columns contain:

*Answer*: The extra information you'd need to get from transcript counts to gene counts:

### 12: The transcripts with the most reads

```bash
# Your command:
```

The output of the command was:

```
```

Code to look up the FASTA header of the top transcript:

```bash
# Your command:
```

The output of the command was:

```
```

*Answer*: The gene that the top transcript belongs to:

*Answer*: Whether the transcript with the most reads also has the highest TPM,
and why the two can differ:

### 13: Transcripts without reads

```bash
# Your command(s):
```

The output of the command(s) was:

```
```

*Answer*: The number and percentage of transcripts without reads:

*Answer*: A possible reason why so many transcripts have no reads:

### 14: Mapping rates

```bash
# Your command:
```

The output of the command was:

```
```

*Answer*: The sample with the lowest mapping rate:

------------------------------------------------------------------------

## Part D: Summarizing all steps with MultiQC

### 15: Update your MultiQC script

<!-- No need to paste the script: we'll look at scripts/multiqc.sh and its Git history directly. -->

### 16: Run MultiQC

*Answer*: For each program, the number of reports that MultiQC found,
and why it found this number:

### 17: Explore the MultiQC report

*Answer*: The sample with the lowest Salmon mapping rate in the General Statistics table,
and whether this matches your answer to question 14:

*Answer*: How STAR's alignment rates in the nf-core report compare to your
Salmon mapping rates, and what could explain the difference:

------------------------------------------------------------------------

## Part E: An overview of your jobs and files

### 18: An overview of your jobs with `sacct`

```bash
# Your command:
```

The output of the command was:

```
```

*Answer*: The total number of jobs, and whether any did not complete successfully:

*Answer*: The step for which the jobs took the longest:

### 19: Which files to keep

```bash
# Your command:
```

The output of the command was:

```
```

*Answer*: Which dirs you would keep long-term and back up,
and which you could delete, and why:

*Answer*: What else you would need to regenerate the deleted dirs:

------------------------------------------------------------------------

## Part F: Bring in genAI

<!-- For both questions, export the conversation to `doc/ai`, and commit it. -->

### 20: AI review of your protocol

*Answer*: What you asked, and a summary of Claude's points:

*Answer*: What you changed in your protocol and/or scripts:

*Answer*: At least one suggestion you didn't follow, and why:

### 21: An AI-generated summary table

*Answer*: What you asked, and the command or script you got
(if it's a script, just give its file name in `scripts/`):

The summary table:

```
```

*Answer*: Which values you checked, against which source, and whether they matched:

------------------------------------------------------------------------

# Submission

### 22: Create a GitHub repository and push

<!-- No command/output needed here -- we check your GitHub repo directly. -->

### 23: Get a (test) DOI with Zenodo

*Answer*: Your Zenodo Sandbox DOI:
