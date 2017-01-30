const React = require('react');

function rightRoundedRect(x, y, width, height, radius) {
  return 'M' + x + ',' + y // Move to (absolute)
       + 'h ' + (width - radius) // Horizontal line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius // Relative arc
       + 'v ' + (height - 2 * radius) // Vertical line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius // Relative arch
       + 'h ' + (radius - width) // Horizontal lint to (relative)
       + 'z '; // path back to start
}

function leftRoundedRect(x, y, width, height, radius) {
  return 'M' + (x + width) + ',' + y // Move to (absolute) start at top-right
       + 'v ' + height // Vertical line to (relative)
       + 'h ' + (radius - width) // Horizontal line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + -radius // Relative arc
       + 'v ' + -(height - 2 * radius) // Vertical line to (relative)
       + 'a ' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius // Relative arch
       + 'z '; // path back to start
}

const InfoBoxContainer = () =>
  <g key='container'>
    <path className='node_info'
          d={leftRoundedRect('0', '0', 48, 48, 4)}
          stroke='#bc3e35'
          strokeWidth={1}
          fill='#d6534a'
    ></path>
    <path className='node'
          d={rightRoundedRect('48', '0', 112, 48, 4)}
          stroke='#343434'
          strokeWidth={1}
          fill='#464646'
    ></path>
  </g>;

const InfoBoxAlert = () =>
  <g key='alert'>
    <circle className='alert'
            cx={24}
            cy={24}
            strokeWidth={0}
            fill='#fffff'
            r={9}
    ></circle>
    <text className='exclamation'
          x={24}
          y={30}
          textAnchor='middle'
          fill='#d75148'
    >{'!'}</text>
  </g>;

const InfoBoxText = (props) =>
  <text className='info_text'
        x={100}
        y={30}
        textAnchor='middle'
        fill='#fff'
  >{props.id}</text>;

module.exports = (props) => (
  <g className='groups' key='groups'>
    { props.data.nodes.map((node, index) => {
        console.log('node = ', node);
        console.log('index = ', index);
        return (
          <g className='node_group' key={index}>
            <InfoBoxContainer/>
            <InfoBoxAlert/>
            <InfoBoxText {...node}/>
          </g>
        )
      })
    }
  </g>
);
