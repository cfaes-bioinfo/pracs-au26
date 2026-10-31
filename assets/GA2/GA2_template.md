<!--
GA2 README template.
- Add your answers to each question's section below.
- For each question, unless noted otherwise: put the command(s) you ran in
  the corresponding ```bash code block, and the command's output in a plain ```
  code block right below it -- these blocks are present in this template,
  so you simply fill them in.
  If a command doesn't print any output, you can leave the output block empty.
- Delete instructional comments like this one as you go.
-->

# GA2 answers - `<your name>`

## Part A: Starting a Git repository

### 1: Copy the template file and add your name

<!-- Put your command in the bash code block below. -->
<!-- Add your name to the header line at the very top of this file. -->

```bash

```

### 2: Initialize a Git repository

<!-- No command/output needed here -- we check the repo directly. -->

### 3: Stage and commit README

<!-- No command/output needed here -- we check the repo directly. -->

## Part B: Exploring the GTF file with Unix data tools

### 4: Create `data`/`results` dirs and copy the GTF file

<!-- Put your command(s) in the bash code block below. -->

```bash

```

The output of the command was:

<!-- Put the command output in the code block below. -->

```

```

### 5: File size of `annot.gtf.gz`

```bash

```

The output of the command was:

```

```

### 6: Decompress the GTF file and check its size

```bash
gunzip data/annot.gtf.gz
```

<!-- Put the command you used to check the size of annot.gtf below. -->

```bash

```

The output of the command was:

```

```

*Answer*: The uncompressed file is approximately _____ times larger.

### 7: Total number of lines in `annot.gtf`

```bash

```

The output of the command was:

```

```

*Answer*: Total number of lines: _____

### 8: Number of lines in the table section (header lines counted by eye)

```bash

```

The output of the command was:

```

```

*Answer*: Number of header lines (counted by eye): _____

*Answer*: Number of lines in the table section: _____

### 9: Number of lines in the table section (`grep -v`)

```bash

```

The output of the command was:

```

```

*Answer*: Number of lines in the table section: _____

### 10: Count distinct sequences, save to `results/scaffolds.txt`

```bash

```

The output of the command was:

```

```

*Answer*: Number of distinct sequences: _____

### 11: Frequency table of feature types

```bash

```

The output of the command was:

```

```

### 12: Predict, then run `grep -c "gene"`

*Answer* (prediction, before running): a / b / c / d

```bash
grep -c "gene" data/annot.gtf
```

The output of the command was:

```

```

*Answer*: Was your prediction correct, and what does the comparison with
the number of genes in your frequency table from question 11 tell you?

## Part C: Updating your Git repository

### 13: Check Git status

```bash

```

The output of the command was:

```

```

### 14: Create `.gitignore` and check status again

<!-- You can create the file with a command or in VS Code; include your git status command and its output. -->

```bash

```

The output of the command was:

```

```

*Answer*: Is the `.gitignore` working as intended?

### 15: Stage and commit `.gitignore`, then README again

<!-- No command/output needed here -- we check the repo directly. -->

## Part D: Exploring the FASTQ files with Unix data tools

### 16: Copy the FASTQ file

```bash

```

The output of the command was:

```

```

### 17: Check Git status again

```bash

```

The output of the command was:

```

```

*Answer*: Does the FASTQ file show up? Why/why not?

### 18: Number of reads in the FASTQ file

```bash

```

The output of the command was:

```

```

*Answer*: Number of reads: _____

### 19: Reads with at least 10 consecutive `N`s

```bash

```

The output of the command was:

```

```

*Answer*: Number of reads with at least 10 consecutive `N`s: _____

### 20: Stage and commit README again

<!-- No command/output needed here -- we check the repo directly. -->

## Bonus

### 21: Why do the counts from questions 8 and 9 differ?

<!-- Add any commands you ran and their output in code blocks, as above. -->

*Answer*:

### 22: Concepts/commands you don't (fully) understand

*Answer*:
