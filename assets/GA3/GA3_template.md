<!--
GA3 README template.
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

# GA3 answers - <your-name>

------------------------------------------------------------------------

## Part A: Your README, data, and Git repo

### 1: Create subdirs and copy files

<!-- No command/output needed -- you can make dirs however you want, and the copy commands are provided. -->

### 2: Initialize a Git repository, and commit the README and `.gitignore`

<!-- No command/output needed here -- we check the repo directly. -->

### 3: Commit throughout the assignment

<!-- No command/output needed here -- we check your commit history directly. -->

------------------------------------------------------------------------

## Part B: Basic shell scripts

### 4: Predict the output of `echo.sh`

<!-- No need to paste the script: we'll look at scripts/echo.sh directly. -->

*Answer* (prediction and reasoning for `bash scripts/echo.sh Oct07 Oct08`):

*Answer* (prediction and reasoning for `bash scripts/echo.sh Oct07 Oct08 Oct09 Oct10`):

*Answer* (prediction and reasoning for `bash scripts/echo.sh Oct07 Oct08 "Oct09 Oct10"`):

*Answer* (prediction and reasoning for `bash scripts/echo.sh results/fastqc/*.html`):

### 5: Run `echo.sh` and compare with your predictions

```bash
bash scripts/echo.sh Oct07 Oct08
```

The output of the command was:

```
```

```bash
bash scripts/echo.sh Oct07 Oct08 Oct09 Oct10
```

The output of the command was:

```
```

```bash
bash scripts/echo.sh Oct07 Oct08 "Oct09 Oct10"
```

The output of the command was:

```
```

```bash
bash scripts/echo.sh results/fastqc/*.html
```

The output of the command was:

```
```

*Answer*: Which output (if any) differed from your prediction, and why?

### 6: Write the `printline.sh` script

<!-- No need to paste the script: we'll look at scripts/printline.sh directly. -->

### 7: Test `printline.sh` twice

Test 1:

```bash
# Your command:
```

The output of the command was:

```
```

Test 2 (with redirection), and checking the contents of the output file:

```bash
# Your command:
```

The output of the command that checks the file contents was:

```
```

------------------------------------------------------------------------

## Part C: A script to run MultiQC

### 8: Get a MultiQC container link

*Answer*: The container link (URI) is:

### 9: MultiQC's help info, and the MultiQC command

Code to run `multiqc --help` with the container:

```bash
# Your command:
```

<!-- You don't need to paste the MultiQC help output -->

The MultiQC command to run MultiQC on `results/fastqc` with output in `results/multiqc`:

```bash
# Your command:
```

### 10: Write the `multiqc.sh` script

<!-- No need to paste the script: we'll look at scripts/multiqc.sh directly. -->

### 11: Run `multiqc.sh`

Code to run the script:

```bash
# Your command:
```

<!-- You don't need to paste the MultiQC logging output -->

*Answer*: Number of FastQC reports MultiQC found:

*Answer*: Does that match what you expected? Why/why not?

### 12: Make `multiqc.sh` accept arguments, and rerun it

<!-- No need to paste the script: we'll look at scripts/multiqc.sh and its Git history directly. -->

Code to rerun the script:

```bash
# Your command:
```

<!-- No need to paste any output -->

### 13: Differences between the two MultiQC runs

*Answer*:

------------------------------------------------------------------------

## Part D: Pandoc to render Markdown

### 14: The structure of the Pandoc command

*Answer* (options and arguments, and what each does):

*Answer* (how does Pandoc know which output format to produce?):

### 15: Render your README to PDF and HTML

```bash
pandoc -o README.pdf README.md
```

- Command to render to HTML:

```bash
# Your command:
```

### 16: Should the rendered files be committed?

*Answer*: Should the rendered files be committed to your Git repo? Why/why not?

### 17: Install the PDF Viewer extension and view the PDF

*Answer*: One observation about the rendered PDF file:

## Part E: Publish your repo on GitHub

### 18: Create a GitHub repository

<!-- No command/output needed here -- we check your GitHub repo directly. -->

### 19: Connect your local repo to GitHub, and push

<!-- No command/output needed here -- we check your GitHub repo directly. -->

### 20: Create an Issue to tag the instructors

<!-- No command/output needed here -- we check your GitHub repo directly. -->

------------------------------------------------------------------------

## Bonus

### 21: Explore the MultiQC report

*Answer* (one insight you gained):

*Answer* (one thing you're confused about):

### 22: Pandoc versions

```bash
# Your command:
```

The output of the command(s) was:

```
```

*Answer*: Is the Pandoc version available by default the most recent one?

*Answer*: Which Pandoc version are you using after loading the module?
