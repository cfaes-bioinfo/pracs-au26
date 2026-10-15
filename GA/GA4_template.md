<!--
GA4 README template.
- Add your answers to each question's section below.
- For each question where we want you to add your commands,
  put the command(s) you ran in the terminal in the corresponding ```bash code block.
- Where we want to see a command's output, there is a plain ``` code block
  right below the command block: paste the output there.
- You don't need to paste the contents of your scripts into this file:
  we will look at the scripts in your `scripts` dir directly
  (so make sure you commit them!).
- Delete instructional comments like this one as you go.
-->

# GA4 answers - <your-name>

------------------------------------------------------------------------

## Part A: Your project dir and Git repo

### 1: Create subdirs and copy `CLAUDE.md`

<!-- No command/output needed. -->

### 2: Initialize a Git repository, and commit your first files

<!-- No command/output needed here -- we check the repo directly. -->

------------------------------------------------------------------------

## Part B: A TrimGalore script --- without genAI

<!-- Reminder: no genAI in this Part! -->

### 3: Get a TrimGalore container link

*Answer*: The container link (URI) is:

### 4: TrimGalore's help info, and three options

Code to run `trim_galore --help` with the container:

```bash
# Your command:
```

<!-- You don't need to paste the TrimGalore help output -->

*Answer*: The option to indicate that the reads are paired-end:

*Answer*: The option to set the output dir:

*Answer*: The option to run FastQC on the trimmed FASTQ files:

### 5: Default thresholds

*Answer*: The default base quality score threshold, and what TrimGalore does with it:

*Answer*: The default read length threshold, and what TrimGalore does with it:

### 6: Write the `trimgalore.sh` script

<!-- No need to paste the script: we'll look at scripts/trimgalore.sh directly. -->

### 7: Run the script for sample `S63`, and check the output files

Code to run the script:

```bash
# Your command:
```

<!-- You don't need to paste the TrimGalore logging output -->

Code to list the output files:

```bash
# Your command:
```

The output of the command was:

```
```

*Answer*: What each type of output file contains:

### 8: Trimming results

*Answer*: Percentage of reads with adapters in R1 and R2:

*Answer*: Percentage of bases that were quality-trimmed in R1 and R2:

*Answer*: Percentage of read pairs removed because they were too short:

### 9: Compare the FastQC reports before and after trimming

*Answer*: At least two differences between the reports:

*Answer*: Were the short reads with only `N`s removed? How could TrimGalore have removed them?

### 10: Parameter expansion for trimmed file names

```bash
# Your commands to test `${R1/_R1/_R2}`:
```

The output of the command(s) was:

```
```

*Answer*: Does it give the correct trimmed R2 file name? Why/why not?

```bash
# Your commands to test a parameter expansion that does work (if needed):
```

The output of the command(s) was:

```
```

------------------------------------------------------------------------

## Part C: Bring in genAI

### 11: Claude reviews your script

*Answer*: Your prompt:

*Answer*: Claude's suggestions, and for each, whether you agree, disagree,
or don't understand it, and why:

*Answer*: Was anything wrong, or in conflict with the course's practices?
Did Claude refer to your `CLAUDE.md` conventions?

### 12: Run the script with a non-existent file

```bash
# Your command:
```

The output of the command was:

```
```

*Answer*: What happens, and at which point does the script stop?

### 13: Claude adds a check to your script

*Answer*: Your prompt:

```bash
# Your command to test the updated script:
```

The output of the command was:

```
```

*Answer*: Does it behave the way Claude claimed it would?

*Answer*: How useful is this check?

### 14: Claude writes a loop

*Answer*: Your prompt:

The loop that Claude wrote:

```bash
# Paste Claude's loop here
```

*Answer*: Does it run the script once per sample?

*Answer*: Does it get the correct R2 file for each R1 file?
Would it have the `S61` pitfall?

*Answer*: Does it only include the 7 `S6` samples?

*Answer*: Did you have to fix the loop? If so, what did you change and why?

### 15: Test and run the loop

The loop with `echo`, to test it:

```bash
# Your loop:
```

The output of the loop was:

```
```

<!-- You don't need to paste the output of the loop that ran TrimGalore -->

```bash
# Your command(s) to check the output files:
```

The output of the command(s) was:

```
```

*Answer*: How many files did you expect in `results/trimgalore`, and is that what you found?

### 16: A summary table

*Answer*: Your prompt:

```bash
# The command you got from Claude:
```

The output of the command was:

```
```

*Answer*: Does the value for `S63` match your answer to question 8?

*Answer*: In your own words, how does the command work?

### 17: Export your conversations

<!-- No command/output needed here -- we check your `doc/ai` dir in the repo directly. -->

### 18: Reflection

*Answer*:

------------------------------------------------------------------------

## Part D: Publish your repo on GitHub

### 19: Create a GitHub repository, connect it, and push

<!-- No command/output needed here -- we check your GitHub repo directly. -->

### 20: Create an Issue to tag the instructors

<!-- No command/output needed here -- we check your GitHub repo directly. -->

------------------------------------------------------------------------

## Bonus

### 21: Something you don't know how to do yourself

*Answer*: Your prompt:

```bash
# The code you got from Claude:
```

The output of the code was:

```
```

*Answer*: How did you check that the code does what you think it does?

### 22: Update your `CLAUDE.md`

*Answer*: What you added to `CLAUDE.md`, and why:

*Answer*: Did Claude follow the new instruction?
