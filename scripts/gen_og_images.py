#!/usr/bin/env python3
"""
Generate newspaper-themed OG share images for hffmnn.com.

Theme:
  - Warm paper background: oklch(97% 0.01 80) ≈ #f5f3ed
  - Charcoal ink: oklch(25% 0.02 80) ≈ #3a3632
  - Ink-soft: oklch(45% 0.03 80) ≈ #6b6460
  - Accent red: oklch(50% 0.18 25) ≈ #9b3d2e
  - Rule lines: oklch(85% 0.01 80) ≈ #d8d5cf

Output: 1200×630 PNG files in static/
"""

from PIL import Image, ImageDraw, ImageFont
import os

# ── Color palette (sRGB approximations of the oklch theme) ──────────────────
PAPER       = (245, 243, 237)   # --paper: warm off-white
INK         = ( 58,  54,  50)   # --ink: deep charcoal
INK_SOFT    = (107, 100,  96)   # --ink-soft: warm mid-grey
ACCENT      = (155,  61,  46)   # --accent: classic ink-red
RULE        = (216, 213, 207)   # --rule: light warm rule

W, H = 1200, 630

# ── Font paths ────────────────────────────────────────────────────────────────
NOTO_SERIF_BOLD    = "/usr/share/fonts/noto/NotoSerif-Bold.ttf"
NOTO_SERIF_REG     = "/usr/share/fonts/noto/NotoSerif-Regular.ttf"
NOTO_SERIF_ITALIC  = "/usr/share/fonts/noto/NotoSerif-Italic.ttf"
LIBERATION_SERIF   = "/usr/share/fonts/liberation/LiberationSerif-Regular.ttf"
LIBERATION_BOLD    = "/usr/share/fonts/liberation/LiberationSerif-Bold.ttf"

def load_font(path: str, size: int) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

def draw_text_centered(draw: ImageDraw.ImageDraw, y: int, text: str,
                        font: ImageFont.FreeTypeFont, fill: tuple,
                        canvas_w: int = W, margin: int = 80) -> int:
    """Draw text centered horizontally, return the bottom y coordinate."""
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    x = (canvas_w - text_w) // 2
    draw.text((x, y), text, font=font, fill=fill)
    return y + (bbox[3] - bbox[1])

def draw_rule(draw: ImageDraw.ImageDraw, y: int, color: tuple,
              thickness: int = 1, margin: int = 80) -> None:
    draw.rectangle([(margin, y), (W - margin, y + thickness - 1)], fill=color)

def make_paper_texture(img: Image.Image) -> Image.Image:
    """Add very subtle grain to suggest paper without importing numpy."""
    import random
    px = img.load()
    rng = random.Random(42)
    for _ in range(W * H // 8):  # sparse random pixels
        x = rng.randint(0, W - 1)
        y = rng.randint(0, H - 1)
        r, g, b = px[x, y]
        delta = rng.randint(-4, 4)
        px[x, y] = (
            max(0, min(255, r + delta)),
            max(0, min(255, g + delta)),
            max(0, min(255, b + delta)),
        )
    return img


def generate_og(output_path: str, config: dict) -> None:
    """
    config keys:
      headline      str   — large serif display text
      subline       str   — smaller serif subtext (or None)
      label         str   — ALL-CAPS small label above headline (or None)
      date_line     str   — bottom-right dateline text (or None)
      logo_text     str   — masthead / logo area text
    """
    img = Image.new("RGB", (W, H), PAPER)
    draw = ImageDraw.ImageDraw(img)

    margin = 72

    # ── Load fonts ────────────────────────────────────────────────────────────
    f_masthead   = load_font(NOTO_SERIF_BOLD, 28)
    f_label      = load_font(LIBERATION_SERIF, 14)
    f_headline   = load_font(NOTO_SERIF_BOLD, 72)
    f_headline_m = load_font(NOTO_SERIF_BOLD, 60)
    f_subline    = load_font(NOTO_SERIF_REG,  26)
    f_small      = load_font(LIBERATION_SERIF, 14)

    # ── Outer border (double rule) ─────────────────────────────────────────────
    # Outer frame
    draw.rectangle([(12, 12), (W - 12, H - 12)], outline=INK, width=2)
    # Inner frame offset
    draw.rectangle([(18, 18), (W - 18, H - 18)], outline=RULE, width=1)

    # ── Masthead band ─────────────────────────────────────────────────────────
    masthead_y = 40

    # Masthead rule above
    draw_rule(draw, masthead_y - 4, INK, thickness=2, margin=margin)

    # Masthead text (domain / site name)
    logo = config.get("logo_text", "hffmnn.com")
    logo_font = load_font(NOTO_SERIF_BOLD, 22)
    draw.text((margin, masthead_y + 4), logo, font=logo_font, fill=INK_SOFT)

    # Date line on the right of masthead
    date_line = config.get("date_line", "hffmnn.com")
    date_bbox = draw.textbbox((0, 0), date_line, font=f_small)
    date_w = date_bbox[2] - date_bbox[0]
    draw.text((W - margin - date_w, masthead_y + 5), date_line, font=f_small, fill=INK_SOFT)

    masthead_bottom = masthead_y + 32

    # Masthead rule below (thick)
    draw_rule(draw, masthead_bottom + 4, INK, thickness=3, margin=margin)
    # Thin rule beneath thick
    draw_rule(draw, masthead_bottom + 10, INK, thickness=1, margin=margin)

    # ── Section label ─────────────────────────────────────────────────────────
    content_top = masthead_bottom + 28

    label = config.get("label")
    if label:
        label_font = load_font(LIBERATION_SERIF, 13)
        label_text = label.upper()
        label_bbox = draw.textbbox((0, 0), label_text, font=label_font)
        label_w = label_bbox[2] - label_bbox[0]
        lx = (W - label_w) // 2
        draw.text((lx, content_top), label_text, font=label_font, fill=ACCENT)
        content_top += 26

    # ── Headline ──────────────────────────────────────────────────────────────
    headline = config["headline"]
    # Try large size first, fall back if too wide
    hl_font = f_headline
    hl_bbox = draw.textbbox((0, 0), headline, font=hl_font)
    if hl_bbox[2] - hl_bbox[0] > W - margin * 2:
        hl_font = f_headline_m
        hl_bbox = draw.textbbox((0, 0), headline, font=hl_font)

    # If still too wide, word-wrap
    headline_lines = []
    words = headline.split()
    current_line = ""
    for word in words:
        test = current_line + (" " if current_line else "") + word
        bb = draw.textbbox((0, 0), test, font=hl_font)
        if bb[2] - bb[0] > W - margin * 2 and current_line:
            headline_lines.append(current_line)
            current_line = word
        else:
            current_line = test
    if current_line:
        headline_lines.append(current_line)

    hl_line_h = draw.textbbox((0, 0), "Ag", font=hl_font)[3] + 8

    # Center vertically in the content area (rough centering)
    total_hl_h = hl_line_h * len(headline_lines)
    subline = config.get("subline")
    sub_h = 36 if subline else 0
    total_content_h = total_hl_h + (20 if subline else 0) + sub_h
    content_area = H - content_top - 80
    hl_y = content_top + (content_area - total_content_h) // 2

    for line in headline_lines:
        draw_text_centered(draw, hl_y, line, hl_font, INK, margin=margin)
        hl_y += hl_line_h

    # ── Thin rule between headline and subline ────────────────────────────────
    if subline:
        rule_y = hl_y + 12
        draw_rule(draw, rule_y, RULE, thickness=1, margin=margin + 80)
        sub_y = rule_y + 14
        draw_text_centered(draw, sub_y, subline, f_subline, INK_SOFT, margin=margin)
        sub_y += 32
    else:
        sub_y = hl_y

    # ── Bottom rule + footer ──────────────────────────────────────────────────
    footer_y = H - 52
    draw_rule(draw, footer_y, INK, thickness=2, margin=margin)
    draw_rule(draw, footer_y + 5, INK, thickness=1, margin=margin)

    # Footer left: site handle
    footer_font = load_font(LIBERATION_SERIF, 13)
    footer_left = config.get("footer_left", "hffmnn.com")
    draw.text((margin, footer_y + 10), footer_left, font=footer_font, fill=INK_SOFT)

    # Footer right: accent label
    footer_right = config.get("footer_right", "")
    if footer_right:
        fr_bbox = draw.textbbox((0, 0), footer_right, font=footer_font)
        fr_w = fr_bbox[2] - fr_bbox[0]
        draw.text((W - margin - fr_w, footer_y + 10), footer_right, font=footer_font, fill=ACCENT)

    # ── Subtle paper texture ──────────────────────────────────────────────────
    img = make_paper_texture(img)

    img.save(output_path, "PNG", optimize=True)
    print(f"  ✓ Saved {output_path}")


# ── Image definitions ─────────────────────────────────────────────────────────

IMAGES = [
    {
        "output": "static/og-image.png",
        "config": {
            "logo_text": "hffmnn.com",
            "date_line": "Phoenix, AZ",
            "label": "Founder · Builder · Privacy Advocate",
            "headline": "James Hoffmann",
            "subline": "Building Rune 1 & PRANA 0.7B  ·  Privacy advocate",
            "footer_left": "hffmnn.com",
            "footer_right": "Pulsyn",
        },
    },
    {
        "output": "static/og-tools.png",
        "config": {
            "logo_text": "hffmnn.com",
            "date_line": "Open Source",
            "label": "Open Source Work",
            "headline": "Open Source Work — hffmnn",
            "subline": "Privacy tools · AI infrastructure · Developer utilities",
            "footer_left": "hffmnn.com/tools",
            "footer_right": "8 projects",
        },
    },
    {
        "output": "static/og-venture.png",
        "config": {
            "logo_text": "hffmnn.com",
            "date_line": "Pulsyn",
            "label": "Venture",
            "headline": "Rune 1  ·  PRANA 0.7B  ·  Pulsyn",
            "subline": "Smart ring · On-device AI · Built in Phoenix, AZ",
            "footer_left": "hffmnn.com/venture",
            "footer_right": "Pulsyn",
        },
    },
]


if __name__ == "__main__":
    # Run from project root
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    print("Generating OG images...")
    for item in IMAGES:
        generate_og(item["output"], item["config"])
    print("Done.")
