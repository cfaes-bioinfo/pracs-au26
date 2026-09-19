<!--
GA2 README template.
- Replace the header line below and fill in every section.
- For each question, unless noted otherwise: put the command(s) you ran in
  a ```bash code block, and the command's output in a plain ``` code block
  right below it, as in the GA2 worked example.
- Delete these instructional comments (the <!-- ... --> blocks and lines) before submitting.
-->

# GA2 answers - `<your name>`

## Part A: Starting a Git repository

### 1: Initialize Git repository

<!-- No command/output needed here -- we check the repo directly. -->

### 2: Add a header to README

<!-- Done at the very top of this file: replace "# GA2 answers - <your name>" with your own name. -->

### 3: Stage and commit README

<!-- No command/output needed here -- we check the repo directly. -->

## Part B: Exploring the GTF file with Unix data tools

### 4: Create `data`/`results` dirs and copy the GTF file

<!-- Put your command in the bash code block below. -->

```bash

```

The output of the command was:

<!-- Put the command output in the code block below. -->

```

```

### 5: File size before/after decompression

```bash

```

The output of the command was:

```

```

```bash
gunzip data/annot.gtf.gz
```

```bash

```

The output of the command was:

```

```

*Answer*: The uncompressed file is approximately _____ times larger.

### 6: Count genomic features (by eye)

```bash

```

The output of the command was:

```

```

*Answer*: Number of header lines (counted by eye): _____
*Answer*: Total number of genomic features: _____

### 7: Count genomic features (`grep -v`)

```bash

```

The output of the command was:

```

```

*Answer*: Count of genomic features: _____

### 8: Compare counts from Q6 and Q7

*Answer*:

### 9: Count distinct sequences, save to `results/scaffolds.txt`

```bash

```

The output of the command was:

```

```

### 10: Frequency table of feature types

```bash

```

The output of the command was:

```

```

### 11: Predict the output of `grep -c "gene"`

*Answer* (prediction, before running): a / b / c / d

### 12: Run `grep -c "gene"` and compare with Q7

```bash
grep -c "gene" data/annot.gtf
```

The output of the command was:

```

```

*Answer*: Was your prediction correct, and what does this comparison with Q7 tell you?

### 13: Check Git status

```bash

```

The output of the command was:

```

```

### 14: Create `.gitignore` and check status again

```bash

```

The output of the command was:

```

```

*Answer*: Is the `.gitignore` working as intended?

### 15: Stage and commit `.gitignore`, then README again

<!-- No command/output needed here -- we check the repo directly. -->

## Part C: Exploring the FASTQ files with Unix data tools

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

### 19: Reads with >=10 consecutive Ns

```bash

```

The output of the command was:

```

```

### 20: Stage and commit README again

<!-- No command/output needed here -- we check the repo directly. -->

## Bonus

### 21: Concepts/commands you don't (fully) understand

*Answer*:
