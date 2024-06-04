/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { ResponsiveLine } from '@nivo/line'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data = [
    {
        "id": "japan",
        "color": "hsl(5, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 277
            },
            {
                "x": "helicopter",
                "y": 122
            },
            {
                "x": "boat",
                "y": 278
            },
            {
                "x": "train",
                "y": 122
            },
            {
                "x": "subway",
                "y": 73
            },
            {
                "x": "bus",
                "y": 32
            },
            {
                "x": "car",
                "y": 15
            },
            {
                "x": "moto",
                "y": 16
            },
            {
                "x": "bicycle",
                "y": 200
            },
            {
                "x": "horse",
                "y": 23
            },
            {
                "x": "skateboard",
                "y": 140
            },
            {
                "x": "others",
                "y": 205
            }
        ]
    },
    {
        "id": "france",
        "color": "hsl(18, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 286
            },
            {
                "x": "helicopter",
                "y": 1
            },
            {
                "x": "boat",
                "y": 262
            },
            {
                "x": "train",
                "y": 73
            },
            {
                "x": "subway",
                "y": 272
            },
            {
                "x": "bus",
                "y": 298
            },
            {
                "x": "car",
                "y": 208
            },
            {
                "x": "moto",
                "y": 19
            },
            {
                "x": "bicycle",
                "y": 216
            },
            {
                "x": "horse",
                "y": 244
            },
            {
                "x": "skateboard",
                "y": 257
            },
            {
                "x": "others",
                "y": 6
            }
        ]
    },
    {
        "id": "us",
        "color": "hsl(83, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 25
            },
            {
                "x": "helicopter",
                "y": 67
            },
            {
                "x": "boat",
                "y": 261
            },
            {
                "x": "train",
                "y": 114
            },
            {
                "x": "subway",
                "y": 155
            },
            {
                "x": "bus",
                "y": 200
            },
            {
                "x": "car",
                "y": 156
            },
            {
                "x": "moto",
                "y": 27
            },
            {
                "x": "bicycle",
                "y": 10
            },
            {
                "x": "horse",
                "y": 70
            },
            {
                "x": "skateboard",
                "y": 125
            },
            {
                "x": "others",
                "y": 173
            }
        ]
    },
    {
        "id": "germany",
        "color": "hsl(163, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 205
            },
            {
                "x": "helicopter",
                "y": 136
            },
            {
                "x": "boat",
                "y": 186
            },
            {
                "x": "train",
                "y": 48
            },
            {
                "x": "subway",
                "y": 113
            },
            {
                "x": "bus",
                "y": 299
            },
            {
                "x": "car",
                "y": 26
            },
            {
                "x": "moto",
                "y": 3
            },
            {
                "x": "bicycle",
                "y": 247
            },
            {
                "x": "horse",
                "y": 100
            },
            {
                "x": "skateboard",
                "y": 16
            },
            {
                "x": "others",
                "y": 37
            }
        ]
    },
    {
        "id": "norway",
        "color": "hsl(343, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 15
            },
            {
                "x": "helicopter",
                "y": 281
            },
            {
                "x": "boat",
                "y": 156
            },
            {
                "x": "train",
                "y": 107
            },
            {
                "x": "subway",
                "y": 122
            },
            {
                "x": "bus",
                "y": 103
            },
            {
                "x": "car",
                "y": 230
            },
            {
                "x": "moto",
                "y": 273
            },
            {
                "x": "bicycle",
                "y": 264
            },
            {
                "x": "horse",
                "y": 193
            },
            {
                "x": "skateboard",
                "y": 180
            },
            {
                "x": "others",
                "y": 266
            }
        ]
    }
]


const GraphCart = ({ data }) => (

    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)



export default GraphCart