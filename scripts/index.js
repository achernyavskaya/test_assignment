'use strict'

window.onload = function () {
    var listContainer = document.getElementById("stations");
    var trainsList = document.getElementById("trains");
    const stationsAPIUrl = "https://api.wmata.com/Rail.svc/json/jStations?api_key=";
    const predictionsAPIUrl = "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/";
    var apiKey = "cq2aqk86k8jsdfafqjkaa7d4";

    fetch(stationsAPIUrl + apiKey)
        .then ((response) => response.json())
        .then(function (data) {
            var stationNames = data.Stations;
            var result = stationNames.map(function (station) {
                var option = document.createElement('option');
                option.value = station.Code;
                option.innerText = station.Name;
                listContainer.appendChild(option);
                return option;
            })
        })

    listContainer.addEventListener('change', function (e) {
        fetch(predictionsAPIUrl + e.target.value + '?api_key=' + apiKey)
            .then ((response) => response.json())
            .then(function (data) {
                var trainNames = data.Trains;
                console.log(trainNames);
                var result = trainNames.map(function (train) {
                    var trains = document.createElement('div');
                    trains.value = train.Group;
                    trains.innerText = train.DestinationName;
                    trainsList.appendChild(trains);
                    return trains;
                })
            })
        jQuery(trainsList).empty();
    })
}
