var scrollreveal = ScrollReveal();

scrollreveal.reveal('.header', {
    delay: 300,
    origin: 'left',
    distance: '90px'
});

scrollreveal.reveal('.sample-image-title', {
    delay: 600,
    origin: 'right',
    distance: '90px'
});

scrollreveal.reveal('.sample-images', {
    delay: 900,
    origin: 'right',
    distance: '90px'
});


scrollreveal.reveal('.diagnose', {
    delay: 400,
    origin: 'right',
    distance: '90px'
});


scrollreveal.reveal('.logo1', {
    delay: 400,
    origin: 'bottom',
    distance: '90px'
});

scrollreveal.reveal('.logo2', {
    delay: 600,
    origin: 'bottom',
    distance: '90px'
});

scrollreveal.reveal('.logo3', {
    delay: 500,
    origin: 'bottom',
    distance: '90px'
});


var model;
var classes = {
    0: "Normal",
    1: "Pneumonia"
};


async function predict_image(input_image) {
    // Predicting the picture output
    console.log('Predicting....');
    let predictions = await model.predict(input_image).data();
    console.log('Generating Prediction success!');

    console.log(predictions);
    // console.log('data sync');

    // Extract the prediction list
    var prediction_list = Array.from(predictions).map(function (p) {
        return {
            probability: p,
            className: classes[1]
        };


    })

    console.log(prediction_list);

    prediction_list.forEach(function (p) {

        $("#prediction-list").append(`<h5>${p.probability.toFixed(5) * 100} %</h5>`).css({
            "margin-left": '-65px',
            "margin-top": '23px'
        });

    });
}


async function deploy() {
    console.log('Deploying model...');

    model = await tf.loadLayersModel('keras model/js_model_final/model.json');
    console.log('model loaded!');

    var sample_image = document.getElementById('input_image');

    $(".selected-image").hide();


    sample_image.addEventListener("change", function () {

        $("#prediction-list").empty();
        console.log('image loaded!');

        var reader = new FileReader();

        reader.onload = function () {
            // console.log(image);
            var dataURL = reader.result;
            $(".selected-image").attr("src", dataURL);
            $(".selected-image").hide();
        }

        var image = this.files[0];
        reader.readAsDataURL(image);
        console.log('Read as data URL');

        processed_image = $('.selected-image').get(0);
        console.log('prepocessed image');

        processed_image = tf.browser.fromPixels(processed_image).resizeNearestNeighbor([250, 250]).toFloat();
        console.log('image converted!!');
        let offset = tf.scalar(127.5);
        processed_image = processed_image.sub(offset).div(offset).expandDims();


        predict_image(processed_image);

    });

}



deploy();