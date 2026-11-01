## The Unix shell & shell scripts

The Unix shell (or the "Terminal") is a **command-line interface to computers**.

Being able to work in the Unix shell is a key skill for omics data analysis,
because a lot of the relevant software is operated using the shell.

. . .

<hr style="height:1pt; visibility:hidden;" />

You'll also write shell *scripts*,
and will use an editor called VS Code for this and other purposes.

<hr style="height:1pt; visibility:hidden;" />

::::::: columns
:::: column
![](../img/bash.png){fig-align="center" width="40%" fig-alt="The Bash logo." .lightbox}

::: legend2
Bash (shell language)
:::
::::

:::: column
![](../img/vscode.png){fig-align="center" width="40%" fig-alt="The VS Code logo." .lightbox}

::: legend2
VS Code
:::
::::
:::::::

## Project file organization & documentation {.nostretch}

Good research project documentation & file organization is a necessary starting
point for reproducible research.

<hr style="height:1pt; visibility:hidden;" />

- You'll learn best practices for project file organization

- You'll learn how to manage your data and software

- You'll learn project documentation strategies,
  and for documentation will use a plain-text file format called *Markdown*

<hr style="height:1pt; visibility:hidden;" />

![](../img/markdown.png){fig-align="center" width="28%" fig-alt="The Markdown logo." .lightbox}

::: legend2
Markdown
:::

## Version control with Git and GitHub

Using version control, you can more effectively keep track of project progress,
collaborate, share code, revisit earlier versions, and undo.

<hr style="height:1pt; visibility:hidden;" />

- *Git* is the version control software we will use,
  and *GitHub* is the website that hosts Git projects (repositories)

- You'll also use these to hand in your graded assignments

<br>

::::: columns
::: {.column width="50%"}
<hr style="height:1pt; visibility:hidden;" />
![](../img/git.png){fig-align="center" width="55%" fig-alt="The Git logo." .lightbox}
:::
::: {.column width="50%"}
![](../img/github.jpg){fig-align="center" fig-alt="The GitHub logo." .lightbox}
:::
:::::

## High-performance computing with OSC

Thanks to supercomputer resources,
you can work with **very large datasets at speed** ---
running up to 100s of analyses in parallel,
and using much larger amounts of memory and storage space than a personal computer has.

<hr style="height:1pt; visibility:hidden;" />

. . .

You will use the **Ohio Supercomputer Center (OSC)** throughout the course!

:::::: columns
::: {.column width="38%"}
<br>
![](../img/osc.png){fig-align="center" width="100%" fig-alt="The OSC logo." .lightbox}
:::
::: {.column width="31%"}
<br><br>
![](../img/apptainer_logo.png){fig-align="center" width="95%" fig-alt="The Apptainer logo." .lightbox}
:::
::: {.column width="31%"}
![](../img/slurm.png){fig-align="center" width="75%" fig-alt="The Slurm logo." .lightbox}
:::
::::::

## Running best-practice pipelines {.nostretch}

An omics data analysis often consists of many consecutive steps,
each using different programs.
Pipelines enable you to run many steps with a single command.

<hr style="height:1pt; visibility:hidden;" />

You will learn how to use comprehensive,
best-practice omics data Nextflow pipelines produced by the *nf-core* initiative.

<br>

:::::: columns
::: {.column width="45%"}
![](../img/nextflow.png){fig-align="center" width="95%" fig-alt="The Nextflow logo." .lightbox}
:::
::: {.column width="7%"}
:::
::: {.column width="40%"}
![](../img/nf-core-logo.png){fig-align="center" width="95%" fig-alt="The nf-core logo." .lightbox}
:::
::::::

## R for data analysis & visualization {.nostretch}

While the Unix shell environment is the best choice for "initial" processing of
a lot of omics data,
R is the most prominent language in "downstream" statistical analysis and
data visualization.

In this course, you will learn the basics of R, how to visualize data in R,
and how you can use specialized "packages" for omics data analysis.

<hr style="height:1pt; visibility:hidden;" />

::::: columns
::: {.column width="35%"}
![](../img/R_logo.svg.png){fig-align="center" width="55%" fig-alt="The R logo." .lightbox}
:::
::: {.column width="35%"}
<br>
![](../img/RStudio_logo_flat.svg.png){fig-align="center" width="80%" fig-alt="The RStudio logo." .lightbox}
:::
::: {.column width="25%"}
![](../img/logo-quarto.png){fig-align="center" width="55%" fig-alt="The Quarto logo." .lightbox}
:::
:::::

. . .

::: callout-tip
#### R vs. Python
Python is also commonly used but I believe that altogether,
R is a far better choice for this course.
Python is a great follow-up language for those seeking to specialize in bioinformatics.
:::

## Using generative AI to help with coding

- Recently, generative AI (genAI) tools such as ChatGPT and Gemini have become ubiquitous.

{{< fa user-edit >}} [***Do you use generative AI on a daily basis?***]{style="color:olive"}

. . .

<br>

- One major use case of generative AI is that **it can help you code**,
  and we'll cover this in week 8.

- Agentic AI
  