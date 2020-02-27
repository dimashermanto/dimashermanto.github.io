class App extends React.Component {
    video_reference = React.createRef();
    canvas_reference = React.createRef();

    

    detect_from_video = (model, video) => {
        model.detect(video).then(predictions => { //Callback function

            document.getElementById("no-webcam-message-panel").style.display = "none";

            this.showDetections(predictions);

            requestAnimationFrame(() => {
                this.detect_from_video(model, video);
            });

        }, (error) => { //If the promise fails (Error handling)
            console.log("Couldn't start the webcam")
            document.getElementById("no-webcam-message-panel").style.display = "block";
            console.error(error)
        });
    };


    showDetections = predictions => {
        const context = this.canvas_reference.current.getContext("2d");
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        const font = "22px monospace";
        context.font = font;
        context.textBaseline = "top";

        predictions.forEach(prediction => {
            //Set required variable
            const x = prediction.bbox[0];
            const y = prediction.bbox[1];
            const width = prediction.bbox[2];
            const height = prediction.bbox[3];

            //Bounding box
            context.strokeStyle = "green";
            context.lineWidth = 2;
            context.strokeRect(x, y, width, height);

            //Draw label
            context.fillStyle = "#green";
            const text_width = context.measureText(prediction.class).width;
            const text_height = parseInt(font, 10);

            // Draw top left rectangle
            context.fillRect(x, y, text_width + 10, text_height + 10);

            // Draw bottom left rectangle
            context.fillRect(x, y + height - text_height, text_width + 15, text_height + 10);

            context.fillStyle = "black";
            context.fillText(prediction.class, x, y);
            context.fillText(prediction.score.toFixed(2), x, y + height - text_height);

        });
    };


    componentDidMount() {
        if (navigator.mediaDevices.getUserMedia) { //If user allow the program to access webcam

            document.getElementById("no-webcam-message-panel").style.display = "none";


            const webcam_promise = navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => {
                //Get current frame
                window.stream = stream;

                //Pass current stream to video_reference
                this.video_reference.current.srcObject = stream;

                return new Promise(resolve => {
                    this.video_reference.current.onloadedmetadata = () => {
                        resolve();
                    };
                });
            }, (error) => {
                document.getElementById("no-webcam-message-panel").style.display = "block";
                console.log("Couldn't start the webcam")
                console.error(error)
            });


            // define a Promise that'll be used to load the model
            const load_model_promise = cocoSsd.load();

            Promise.all([load_model_promise, webcam_promise]).then(values => {
                this.detect_from_video(values[0], this.video_reference.current);
            })
                .catch(error => {
                    console.error(error);
                });

        }
    }

    render() {
        return (
            <div>
                <video autoPlay muted ref={this.video_reference} width="250" height="150" />
                <canvas ref={this.canvas_reference} width="250" height="150" />
            </div>
        );
    }


}

const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(App), domContainer);
