## 2026-07-27

### Q

When running quarto publish, I get:

"Jupyter is not available in this Python installation.
Install with python3 -m pip install jupyter"

When running the install command, I get:

poelstra.1@OHQ73DH4TP2V PP5006-AU26_site % python3 -m pip install jupyter
error: externally-managed-environment

How to best handle this, with a virtual env?

### A

Here's what's set up and what you need to do going forward:

Done:

Created .venv/ in the project and installed Jupyter into it (avoids the system/Homebrew Python's PEP 668 lock).
Added /.venv/ to .gitignore so it's never committed.
Registered that venv as a named Jupyter kernel (pp5006-au26) at the user level, so Quarto can find it via kernel discovery even without the venv being "active" in your shell.
What you need to do:

If any .qmd files use Python code chunks, make sure their YAML specifies the kernel:


jupyter: pp5006-au26
(either in the individual file's front matter or in _quarto.yml under jupyter: at the top level).

Then just run:


quarto publish
No need to activate the venv manually each time — the registered kernel makes it discoverable regardless of your shell's active Python.

If it still doesn't find it, the fallback is to always activate the venv before running Quarto commands:


source .venv/bin/activate
quarto publish
Want me to check whether any .qmd/_quarto.yml files already declare a jupyter: engine, so I can wire the kernel name in for you?