import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function makeThumb(page) {
  // draw page to fit into 96x96 canvas
  const vp = page.getViewport({ scale: 1, });
  const canvas = document.createElement("canvas");
  const scalesize = 1;
  canvas.width = vp.width * scalesize;
  canvas.height = vp.height * scalesize;
  const scale = Math.min(canvas.width / vp.width, canvas.height / vp.height);
  console.log(vp.width, vp.height, scale);
  return page.render({ canvasContext: canvas.getContext("2d"), viewport: page.getViewport({ scale: scale }) }).promise.then(function () {
    return canvas;
  });
}
