# Create a one-row-per-gene annotation table ('genes.tsv') from the Culex GTF,
# for the week 13 R lectures.
# Run from the site root: Rscript assets/week13/make_genes_tsv.R
# The GTF (assets/annot.gtf) is git-ignored; the output file is not.

library(tidyverse)

gtf_file <- "assets/annot.gtf"
out_file <- "assets/week13/genes.tsv"

gtf <- read_tsv(
  gtf_file,
  col_names = FALSE,
  comment = "#",
  quote = "",
  show_col_types = FALSE
)

# Extract the value of a GTF attribute (column 9)
get_attr <- function(x, key) {
  str_extract(x, paste0(key, ' "([^"]*)"'), group = 1)
}

# Chromosome names for the RefSeq accessions (assembly TS_CPP_V2);
# genes on unplaced scaffolds (NW_...) get NA
chrom_names <- c(
  NC_068937.1 = "chr1",
  NC_068938.1 = "chr2",
  NC_068939.1 = "chr3",
  NC_015079.1 = "MT"
)

genes <- gtf |>
  filter(X3 == "gene") |>
  transmute(
    gene_id = get_attr(X9, "gene_id"),
    chromosome = unname(chrom_names[X1]),
    biotype = get_attr(X9, "gene_biotype"),
    description = get_attr(X9, "description")
  )

# Length of the longest transcript of each gene (sum of its exon lengths);
# genes without exons in the GTF (pseudogenes) get NA
tx_lengths <- gtf |>
  filter(X3 == "exon") |>
  mutate(
    gene_id = get_attr(X9, "gene_id"),
    transcript_id = get_attr(X9, "transcript_id"),
    exon_length = X5 - X4 + 1
  ) |>
  summarize(tx_length = sum(exon_length), .by = c(gene_id, transcript_id)) |>
  summarize(transcript_length = max(tx_length), .by = gene_id)

genes <- genes |>
  left_join(tx_lengths, by = "gene_id")

write_tsv(genes, out_file, na = "NA")
