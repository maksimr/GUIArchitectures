var $ = require('jquery');

$(function () {
    var stationListNode = $('#stationList');
    var stations = [
        {
            value: '1'
        },
        {
            value: '2'
        }
    ];

    stationListNode.append(stations.map(function (station) {
        return $('<option>' + station.value + '</option>').get(0);
    }));
});