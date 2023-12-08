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

function posXY(center, radius, angle) {
    return [
        center + radius * Math.cos(angle * Math.PI / 180.0),
        center + radius * Math.sin(angle * Math.PI / 180.0)
    ]
}

function segment(index, segments, size, radius, width) {
    const center = size / 2
    const degrees = 360 / segments
    const start = degrees * index
    const end = (degrees * (index + 1) + 1)
    const path = segmentPath(center, center, radius, radius - width, start, end)
    return `<path d="${path}" />`
}

const data = [
    {
        worldage: {
            ref: "scorpio", // The icon reference
            date: ""
        }
    },
    {
        worldage: {
            ref: "libra", // The icon reference
            date: ""
        }
    },
    {
        worldage: {
            ref: "virgo", // The icon reference
            date: ""
        }
    },
    {
        worldage: {
            ref: "leo", // The icon reference
            date: ""
        }
    },
    {
        worldage: {
            ref: "cancer", // The icon reference
            date: ""
        }
    },
    {
        worldage: {
            ref: "gemini", // The icon reference
            date: ""
        }
    },
    {
        worldage: {
            ref: "taurus", // The icon reference
            date: ""
        }
    },
    {
        worldage: {
            ref: "aries", // The icon reference
            date: ""
        }
    },
    {
        worldage: {
            ref: "pisces", // The icon reference
            date: ""
        }
    },
    {
        worldage: {
            ref: "aquarius", // The icon reference
            date: ""
        }
    },
    {
        worldage: {
            ref: "capricorn", // The icon reference
            date: ""
        }
    },
    {
        worldage: {
            ref: "sagittarius", // The icon reference
            date: ""
        }
    }
];

const size = 300; /* diameter / viewBox */
const radius = size / 2;
const svg = data.map((obj, index) => {
    const angle = index * (360 / data.length);
    const [x0, y0] = posXY(radius, 125, angle);
    return `
  <g class="wac-arcs">
    <a xlink:href="/intro/age-of-${obj.worldage.ref}/">
      ${segment(index, data.length, size, radius, 50, 50)}
    </a>
  </g>
  <g transform="translate(${x0 - 15}, ${y0 - radius})">
    <use width="30" xlink:href="#${obj.worldage.ref}"></use>
  </g>
  `
}).join('')

console.log(svg);