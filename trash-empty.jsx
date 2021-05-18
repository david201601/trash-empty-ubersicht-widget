// This is a simple example Widget to get you started with Übersicht.
// For the full documentation please visit:
// https://github.com/felixhageloh/uebersicht

// You can modify this widget as you see fit, or simply delete this file to
// remove it.
import { run } from 'uebersicht'

// this is the shell command that gets executed every time this widget refreshes
export const command = "cd && du -ch ~/.Trash | grep total | cut -c 1-5";

// the refresh frequency in milliseconds
export const refreshFrequency = 10000;

// the CSS style for this widget, written using Emotion
// https://emotion.sh/
export const className =`
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  font-family: Helvetica Neue;
  font-weight: 1000;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 4px 10px 4px 10px;
  border-radius: 30px;

  h1 {
    font-size: 20px;
    margin: 16px 0 8px;
  }

  em {
    font-weight: 400;
    font-style: normal;
  }
  img {
    height: 12px;
    margin-bottom: -1px;
    padding: 0px 3px;
  }
`
export const handleSize = (output) => {
  if (output.indexOf(" 0B") > -1) {
    return 'Empty'
  } else if (output == '') {
    return '· · · ·'
  } else {
    return output
  }
}

var clickCount = 0;
export const delay = n => new Promise(resolve => setTimeout(resolve, n));
// render gets called after the shell command has executed. The command's output
// is passed in as a string.
export const render = ({output}, dispatch) => {
  return (
    <div>
        <img src="trash-size.widget/trash.png" onClick={() => {
          clickCount += 1;
          if (clickCount < 2) {
            if(clickCount == 1) {
              console.log('Click once more')
            }
            delay(500).then(() => {
              if(clickCount < 2 ) {
                console.log('Time out')
              }
              clickCount = 0;
            })
          } else {
            console.log('Trying to clear trash')
            run("cd && rm -rf ~/.Trash/*")
             .then((output) => dispatch({type: 'OUTPUT_UPDATED', output: ' 0B'}))
          }
      }}/>
        <a class="size">{handleSize(output)}</a>
    </div>
  );
}

