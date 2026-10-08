-- Non-runnable code blocks (```{.norun}``` -- see the .norun rules in
-- styles.css): wrap each in a div.norun-box (plus .syntax, if present).
-- The dashed frame and the "don't run"/"syntax" label go on this wrapper,
-- so the <pre> inside can scroll horizontally like regular code blocks
-- without clipping the label, which sits on the frame's top edge.
function CodeBlock(el)
  if not el.classes:includes("norun") then
    return nil
  end
  local classes = { "norun-box" }
  if el.classes:includes("syntax") then
    table.insert(classes, "syntax")
  end
  return pandoc.Div(el, pandoc.Attr("", classes))
end
