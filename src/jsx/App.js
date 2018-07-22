import React, {Component} from 'react';
import './App.css';

class MemeCreator extends Component {
    state = {
        topLine: '',
        bottomLine: '',
        imgSrc: '',
    };

    componentDidUpdate(props, state) {
        const {bottomLine, topLine, imgSrc} = this.state;
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        // Your code here
        if (imgSrc != null) {
            ctx.drawImage(imgSrc, 0, 0, canvas.width, canvas.height);
        }
        ctx.font = '36pt Impact';
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.lineWidth = 3;
        if (topLine !== null) {
            ctx.strokeText(topLine, canvas.width / 2, 40);
            ctx.fillText(topLine, canvas.width/2, 40);
        }
        if (bottomLine !== null) {
            ctx.strokeText(bottomLine, canvas.width / 2, (canvas.height - 20));
            ctx.fillText(bottomLine, canvas.width/2, (canvas.height - 20));
        }
    }

    handleFileSelect(evt) {
        const file = evt.target.files[0];

        const reader = new FileReader();
        const self = this;
        reader.onload = function(fileObject) {
            const data = fileObject.target.result;

            // Create an image object
            const image = new Image();
            image.onload = function(f) {
                const imgSrc = this;
                self.setState({
                    imgSrc,
                });
            };
            // Set image data to background image.
            image.src = data;
        };

        reader.readAsDataURL(file);
    }

  render() {
    const {topLine, bottomLine} = this.state;
    return (
      <div>
        <div>
            <input onChange={ (e) => this.handleFileSelect(e)}
             type='file' name='picture' />
        </div>
        <div className='image-container'>
            <canvas width='500' height='500'></canvas>
            <div className='text-container'>
                <span>Top Line:</span><br/>
                <input className='text' onChange={ (e) =>
                  this.setState({topLine: e.target.value}) } value={ topLine }
                  name='topLine' type='text' />
                <span>Bottom Line:</span>
                <input className='text' onChange={ (e) =>
                  this.setState({bottomLine: e.target.value}) }
                  value={ bottomLine } name='bottomLine' type='text' />
                <button className='text' onClick={ (e) =>
                  window.open(document.querySelector('canvas').toDataURL()) }>
                  Save</button>
            </div>
        </div>
      </div>
    );
  }
}

export default MemeCreator;
