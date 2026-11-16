library(grid)

# Draws img/pivot_longer_plants.png for week13/w13a_data-wrangling.qmd
# Run from the project root: Rscript assets/week13/pivot_longer_plants.R
args <- commandArgs(TRUE)
out <- if (length(args)) args[1] else "img/pivot_longer_plants.png"
W <- 1000; H <- 300
ragg::agg_png(out, width = 2 * W, height = 2 * H, res = 192, background = "white")
pushViewport(viewport(xscale = c(0, W), yscale = c(0, H)))
Y <- function(y) H - y  # y from top

grey <- "#D9D9D9"; blue <- "#8ED5E8"; yellow <- "#FFD155"; green <- "#3BDA90"
fam <- "Helvetica Neue"
fs <- 15; rh <- 29; gap <- 3

cell <- function(x, y, w, txt, fill, bold = FALSE, right = FALSE) {
  grid.rect(x + gap / 2, Y(y + gap / 2), w - gap, rh - gap, default.units = "native",
            just = c("left", "top"), gp = gpar(fill = fill, col = NA))
  grid.text(txt, if (right) x + w - 10 else x + 8, Y(y + rh / 2), default.units = "native",
            just = if (right) "right" else "left",
            gp = gpar(fontfamily = fam, fontsize = fs, fontface = if (bold) "bold" else "plain",
                      col = "#222222"))
}

table <- function(x0, y0, widths, header, rows, hfill, cfill, right) {
  x <- cumsum(c(x0, widths))
  for (j in seq_along(header)) cell(x[j], y0, widths[j], header[j], hfill[j], bold = TRUE)
  for (i in seq_along(rows)) for (j in seq_along(header))
    cell(x[j], y0 + i * rh, widths[j], rows[[i]][j], cfill[j], right = right[j])
}

# Code line with highlighted arguments
parts <- list(
  c("pivot_longer(cols = ", NA), c("!plant", "#00FFFF"),
  c(", names_to = ", NA), c("\"dpi\"", "#00FF00"),
  c(", values_to = ", NA), c("\"height\"", "#00FF00"), c(")", NA)
)
cfs <- 18
gp_code <- gpar(fontfamily = fam, fontsize = cfs, col = "black")
widths <- sapply(parts, function(p)
  convertWidth(grobWidth(textGrob(p[1], gp = gp_code)), "native", TRUE))
x <- (W - sum(widths)) / 2; yc <- 45
for (k in seq_along(parts)) {
  if (!is.na(parts[[k]][2]))
    grid.rect(x, Y(yc), widths[k], 30, default.units = "native", just = c("left", "centre"),
              gp = gpar(fill = parts[[k]][2], col = NA))
  grid.text(parts[[k]][1], x, Y(yc), default.units = "native", just = "left", gp = gp_code)
  x <- x + widths[k]
}

# Wide table
wide_rows <- list(c("P1", "10.2", "15.1"), c("P2", "9.8", "14.3"))
table(130, 115, c(70, 80, 80), c("plant", "7dpi", "14dpi"), wide_rows,
      hfill = c(grey, blue, blue), cfill = c(grey, yellow, yellow), right = c(FALSE, TRUE, TRUE))

# Long table
long_rows <- list(c("P1", "7dpi", "10.2"), c("P1", "14dpi", "15.1"),
                  c("P2", "7dpi", "9.8"), c("P2", "14dpi", "14.3"))
table(640, 115, c(70, 80, 80), c("plant", "dpi", "height"), long_rows,
      hfill = c(grey, green, green), cfill = c(grey, blue, yellow), right = c(FALSE, FALSE, TRUE))

# Dotted curved arrow
grid.bezier(x = c(245, 250, 350, 625), y = Y(c(212, 262, 262, 262)), default.units = "native",
            arrow = arrow(length = unit(10, "points"), type = "closed"),
            gp = gpar(col = "#8A9599", fill = "#8A9599", lwd = 3, lty = "11"))

invisible(dev.off())
