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

# Part I: A multi-step workflow

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

## Part B: Read QC and trimming

### 5: Run FastQC

*Answer*: The number of batch jobs you submitted, and whether they all succeeded:

### 6: Run TrimGalore

<!-- No command/output needed here -- we check `protocol.md` directly. -->

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

### 9: A Salmon container

*Answer*: The container link (URI) is:

Code to print Salmon's version with the container:

```bash
# Your command:
```

The output of the command was:

```
```

### 10: Create the Salmon index

Code to check the size of the index dir:

```bash
# Your command:
```

The output of the command was:

```
```

*Answer*: How long it took to create the index, and how you found out:

*Answer*: The size of the index dir:

### 11: Run Salmon for all samples

<!-- No command/output needed here -- we check `protocol.md` directly. -->

### 12: Salmon's `quant.sf` output file

*Answer*: What the `TPM` and `NumReads` columns contain:

*Answer*: The extra information you'd need to get from transcript counts to gene counts:

### 13: Mapping rates

```bash
# Your command:
```

The output of the command was:

```
```

*Answer*: The sample with the lowest mapping rate:

### 14: Library type

*Answer*: The library type that Salmon inferred, and the file in which you found it:

*Answer*: What this library type means:

------------------------------------------------------------------------

## Part D: Summarizing all steps with MultiQC

### 15: Update your MultiQC script

<!-- No need to paste the script: we'll look at scripts/multiqc.sh and its Git history directly. -->

### 16: Run MultiQC

*Answer*: For each program, the number of reports that MultiQC found,
and why it found this number:

### 17: Explore the MultiQC report

*Answer*: The sample with the lowest Salmon mapping rate in the General Statistics table,
and whether this matches your answer to question 13:

*Answer*: A FastQC metric that differs between the raw and trimmed reads,
and how it differs:

*Answer*: How STAR's alignment rates in the nf-core report compare to your
Salmon mapping rates, and what could explain the difference:

------------------------------------------------------------------------

# Part II: Positron setup

## Part E: Install Positron and connect to OSC

<!-- If you couldn't get Positron to work: describe what you tried and where you got stuck,
     and do question 19 with RStudio Server instead. -->

### 18: Connect to OSC

The output of `hostname` in the Positron terminal was:

```
```

*Answer*: Are you on a login node or on a compute node, and how can you tell?

*Answer*: The version of Positron you installed:

### 19: Check that R works

The output of `R.version.string` was:

```
```

<!-- Make sure the screenshot file is in `doc/` and committed,
     and change the file name below if needed. -->

![My Positron window](doc/positron.png)

------------------------------------------------------------------------

# Submission

### 20: Create a GitHub repository, push, and create an Issue

<!-- No command/output needed here -- we check your GitHub repo directly. -->
