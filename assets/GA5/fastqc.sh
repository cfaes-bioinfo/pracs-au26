#!/bin/bash
#SBATCH --account=PAS3493
#SBATCH --mail-type=FAIL
#SBATCH --output=slurm-fastqc-%j.out
set -euo pipefail

# Run FastQC on one FASTQ file to check its quality
# Usage: sbatch scripts/fastqc.sh <FASTQ file> <output dir>

# Constants
FASTQC_CONTAINER=oras://community.wave.seqera.io/library/fastqc:0.12.1--104d26ddd9519960

# Copy the placeholder variables
fastq="$1"
outdir="$2"

# Initial logging
echo "# Starting script fastqc.sh"
date
echo "# Input FASTQ file:   $fastq"
echo "# Output dir:         $outdir"
echo

# Create the output dir (with a subdir for Slurm logs)
mkdir -p "$outdir"/logs

# Run FastQC
apptainer exec "$FASTQC_CONTAINER" fastqc \
    --outdir "$outdir" \
    "$fastq"

# Final logging
echo
echo "# Used FastQC version:"
apptainer exec "$FASTQC_CONTAINER" fastqc --version
echo
echo "# Successfully finished script fastqc.sh"
date
