import json
import re
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
GALLERY = (ROOT / "assets" / "gallery").resolve()
MANIFEST = ROOT / "content" / "gallery.json"


def local_path(value: str) -> Path:
    path = (ROOT / value.lstrip("/")).resolve()
    if GALLERY not in path.parents:
        raise ValueError(f"Image outside gallery: {value}")
    return path


def safe_stem(path: Path) -> str:
    stem = re.sub(r"-(desktop|mobile)$", "", path.stem, flags=re.I)
    stem = re.sub(r"[^a-zA-Z0-9_-]+", "-", stem).strip("-").lower()
    return stem or "photo"


def save_webp(source: Path, destination: Path, maximum: tuple[int, int], quality: int) -> None:
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGB")
        image.thumbnail(maximum, Image.Resampling.LANCZOS)
        destination.parent.mkdir(parents=True, exist_ok=True)
        image.save(destination, "WEBP", quality=quality, method=6)


data = json.loads(MANIFEST.read_text(encoding="utf-8"))
changed = False

for photo in data.get("photos", []):
    desktop_value = str(photo.get("desktop", ""))
    if not desktop_value:
        continue

    source = local_path(desktop_value)
    if not source.exists():
        print(f"Skipping missing image: {desktop_value}")
        continue

    already_optimized = source.name.lower().endswith("-desktop.webp")
    stem = safe_stem(source)
    desktop = GALLERY / f"{stem}-desktop.webp"
    mobile = GALLERY / f"{stem}-mobile.webp"

    if not already_optimized:
        save_webp(source, desktop, (1920, 1920), 78)
        save_webp(source, mobile, (900, 900), 72)
        if source not in (desktop, mobile):
            source.unlink()
        photo["desktop"] = f"/assets/gallery/{desktop.name}"
        photo["mobile"] = f"/assets/gallery/{mobile.name}"
        changed = True
        print(f"Optimized {source.name}")
    elif not photo.get("mobile") or not local_path(str(photo["mobile"])).exists():
        save_webp(source, mobile, (900, 900), 72)
        photo["mobile"] = f"/assets/gallery/{mobile.name}"
        changed = True
        print(f"Created mobile version for {source.name}")

if changed:
    MANIFEST.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
else:
    print("Gallery is already optimized")
