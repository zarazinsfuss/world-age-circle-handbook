function polarToCartesian(x, y, r, degrees) {
  const radians = degrees * Math.PI / 180.0;
  return [x + (r * Math.cos(radians)), y + (r * Math.sin(radians))]
}

function segmentPath(x, y, r0, r1, d0, d1) {
  const arc = Math.abs(d0 - d1) > 180 ? 1 : 0
  const point = (radius, degree) =>
    polarToCartesian(x, y, radius, degree)
      .map(n => n.toPrecision(5))
      .join(',')
  return [
    `M${point(r0, d0)}`,
    `A${r0},${r0},0,${arc},1,${point(r0, d1)}`,
    `L${point(r1, d1)}`,
    `A${r1},${r1},0,${arc},0,${point(r1, d0)}`,
    'Z',
  ].join('')
}

function segmentSvg(index, segments, size, radius, width) {
  const center = size / 2
  const degrees = 360 / segments 
  const start = degrees * index 
  const end = (degrees * (index + 1) + 1)
  const path = segmentPath(center, center, radius, radius-width, start, end)
  return `<path d="${path}" />`
}

let segment_size   = 300
let segment_radius = 150
let segment_width   = 50
let amount_segments = 12

console.log("<svg class=\"cf\" viewBox=\"0 0 300 300\">")
for (let i = 0; i < amount_segments; i++) {
  console.log("<g class=\"cf-arcs\">")
  var segment = segmentSvg(i, amount_segments, size = segment_size, radius = segment_radius, width = segment_width)
  console.log(segment)
  console.log("</g>")
}
console.log("</svg>")
