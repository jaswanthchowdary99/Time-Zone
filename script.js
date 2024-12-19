// function getCurrentTimezone() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function(position) {
//             const lat = position.coords.latitude;
//             const lon = position.coords.longitude;
//             fetchTimezone(lat, lon, 'current-timezone');
//         }, function() {
//             document.getElementById('current-timezone').textContent = 'Geolocation not supported or permission denied';
//         });
//     } else {
//         document.getElementById('current-timezone').textContent = 'Geolocation not supported by this browser';
//     }
// }

// function fetchTimezone(lat, lon, displayElementId) {
//     const apiKey = '7D6AF025T4M2'; 
//     const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             if (data.status === 'OK') {
//                 const timezoneData = data;
//                 document.getElementById(displayElementId).innerHTML = `
//                     <strong>Name of Time Zone:</strong> ${timezoneData.zoneName} <br>
//                     <strong>Lat:</strong> ${lat} <br>
//                     <strong>Long:</strong> ${lon} <br>
//                     <strong>Offset STD:</strong> ${timezoneData.gmtOffset} hours <br>
//                     <strong>Offset STD Seconds:</strong> ${timezoneData.gmtOffset * 3600} seconds <br>
//                     <strong>Offset DST:</strong> ${timezoneData.dstOffset} hours <br>
//                     <strong>Offset DST Seconds:</strong> ${timezoneData.dstOffset * 3600} seconds <br>
//                     <strong>Country:</strong> ${timezoneData.countryName} <br>
//                     <strong>Postcode:</strong> ${timezoneData.postalCode || 'N/A'} <br>
//                     <strong>City:</strong> ${timezoneData.cityName || 'N/A'} <br>
//                 `;
//             } else {
//                 document.getElementById(displayElementId).textContent = `Error: ${data.message}`;
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching timezone:', error);
//             alert('Failed to fetch timezone');
//         });
// }



// function getCoordinatesFromAddress(address) {
//     const apiKey = '709bbea2c9f14819b1ab2339ff848ebb';  
//     const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             if (data.features && data.features.length > 0) {
//                 const lat = data.features[0].geometry.coordinates[1];
//                 const lon = data.features[0].geometry.coordinates[0];
//                 fetchTimezone(lat, lon, 'address-timezone');
//             } else {
//                 document.getElementById('address-timezone').textContent = 'Address not found';
//             }
//         })
//         .catch(error => {
//             console.error('Error geocoding address:', error);
//             document.getElementById('address-timezone').textContent = 'Failed to retrieve address';
//         });
// }

// document.getElementById('fetch-timezone').addEventListener('click', function() {
//     const address = document.getElementById('address').value.trim();
//     const addressTimezone = document.getElementById('address-timezone');
    
//     if (address) {
//         getCoordinatesFromAddress(address);
//     } else {
//         addressTimezone.innerHTML = '';
//         addressTimezone.style.backgroundColor = 'black'; 
        
//     }
// });

// getCurrentTimezone();

function getCurrentTimezone() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchTimezone(lat, lon, 'current-timezone');
        }, function() {
            document.getElementById('current-timezone').textContent = 'Geolocation not supported or permission denied';
        });
    } else {
        document.getElementById('current-timezone').textContent = 'Geolocation not supported by this browser';
    }
}

function fetchTimezone(lat, lon, displayElementId) {
    const apiKey = '7D6AF025T4M2'; 
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                const timezoneData = data;
                document.getElementById(displayElementId).innerHTML = `
                    <strong>Name of Time Zone:</strong> ${timezoneData.zoneName} <br>
                    <strong>Lat:</strong> ${lat} <br>
                    <strong>Long:</strong> ${lon} <br>
                    <strong>Offset STD:</strong> ${timezoneData.gmtOffset} hours <br>
                    <strong>Offset STD Seconds:</strong> ${timezoneData.gmtOffset * 3600} seconds <br>
                    <strong>Offset DST:</strong> ${timezoneData.dstOffset} hours <br>
                    <strong>Offset DST Seconds:</strong> ${timezoneData.dstOffset * 3600} seconds <br>
                    <strong>Country:</strong> ${timezoneData.countryName} <br>
                    <strong>Postcode:</strong> ${timezoneData.postalCode || 'N/A'} <br>
                    <strong>City:</strong> ${timezoneData.cityName || 'N/A'} <br>
                `;
            } else {
                document.getElementById(displayElementId).textContent = `Error: ${data.message}`;
            }
        })
        .catch(error => {
            console.error('Error fetching timezone:', error);
            alert('Failed to fetch timezone');
        });
}

function getCoordinatesFromAddress(address) {
    const apiKey = '709bbea2c9f14819b1ab2339ff848ebb';  
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.features && data.features.length > 0) {
                const lat = data.features[0].geometry.coordinates[1];
                const lon = data.features[0].geometry.coordinates[0];
                fetchTimezone(lat, lon, 'address-timezone');
            } else {
                document.getElementById('address-timezone').textContent = 'Address not found';
            }
        })
        .catch(error => {
            console.error('Error geocoding address:', error);
            document.getElementById('address-timezone').textContent = 'Failed to retrieve address';
        });
}

document.getElementById('fetch-timezone').addEventListener('click', function() {
    const address = document.getElementById('address').value.trim();
    const addressTimezone = document.getElementById('address-timezone');
    const errorMsg = document.getElementById('error-msg');
    const outputName = document.getElementById('output-name');

    addressTimezone.innerHTML = '';
    addressTimezone.style.backgroundColor = '';
    outputName.style.display = 'none';

    if (address === '') {
        errorMsg.style.display = 'block';
        addressTimezone.textContent = ''; 
    } else {
        errorMsg.style.display = 'none';
        outputName.style.display = 'block';
        addressTimezone.style.border = '1px solid white';
        getCoordinatesFromAddress(address);
    }
});

getCurrentTimezone();

