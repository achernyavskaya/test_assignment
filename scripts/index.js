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
                function tabulate(data, columns) {
                    var table = d3.select(trainsList).append('table');
                    var thead = table.append('thead');
                    var	tbody = table.append('tbody');

                    // append the header row
                    thead.append('tr')
                        .selectAll('th')
                        .data(columns).enter()
                        .append('th')
                        .text(function (column) { return column; });

                    // create a row for each object in the data
                    var rows = tbody.selectAll('tr')
                        .data(data)
                        .enter()
                        .append('tr');

                    // create a cell in each row for each column
                    var cells = rows.selectAll('td')
                        .data(function (row) {
                            return columns.map(function (column) {
                                return {column: column, value: row[column]};
                            });
                        })
                        .enter()
                        .append('td')
                        .text(function (d) { return d.value; });

                    return table;
                }

                // render the table(s)
                tabulate(trainNames, ['Car', 'DestinationName']); // 2 column table

            });
                /*var result = trainNames.map(function (train) {
                    var trains = document.createElement('div');
                    var car = document.createElement('div');
                    car.innerText = train.Car;
                    trains.value = train.Group;
                    trains.innerText = train.DestinationName;
                    trains.appendChild(car);
                    trainsList.appendChild(trains);
                    return trains;
                })*/
            })
        jQuery(trainsList).empty();
    }

