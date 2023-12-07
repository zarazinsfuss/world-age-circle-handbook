function posXY(center, radius, angle) {
  return [
    center + radius * Math.cos(angle * Math.PI / 180.0), 
    center + radius * Math.sin(angle * Math.PI / 180.0)
  ]
}

let segment_size   = 300
let segment_radius = 150
let segment_width   = 50
let amount_segments = 12

for (let i = 0; i < amount_segments; i++) {
  var [x, y] = posXY(segment_size/2, 123, i*30);
  console.log(x-15, y-(segment_size/2));
}
