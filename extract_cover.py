import fitz
import os
from PIL import Image
import io

pdf_path = r"c:\Users\karan\Desktop\GNDEC_MAGAZINE\public\images\FRONT-COVER.pdf"
out_dir = r"c:\Users\karan\Desktop\GNDEC_MAGAZINE\public\magazines\harmony-2026"
os.makedirs(out_dir, exist_ok=True)
out_path = os.path.join(out_dir, "harmony-2026_page-0001.webp")

doc = fitz.open(pdf_path)
page = doc.load_page(0)
pix = page.get_pixmap(dpi=150)

# Convert to PIL Image
img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
print(f"Original Cover Dimension: {pix.width}x{pix.height}")
# Let's save as WebP with 80 quality
img.save(out_path, format="webp", quality=85)

print(f"Optimized Cover saved to {out_path}")
print(f"File size: {os.path.getsize(out_path)} bytes")
