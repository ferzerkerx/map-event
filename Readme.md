# MapEvent

## Overview 
- Render a map based on a topojson file
- Highlight areas in a map when an event occurs matching the region name
- mouse over provides shows a toolip with region information


## How to create a topojson map
- download a map shipfile zip file from: https://gadm.org/download_country_v3.html
- npm install -g shapefile
- npm install -g topojson
- convert each shapefile to gson:
    + shp2json gadm36_DEU_0.shp -o feature_name.json
    - or
    + sudo apt-get install gdal-bin
      ogr2ogr -f GeoJSON your_gson_file.json gadm36_DEU_0.shp

    
- convert it to topojson:
    + topojson -o outputfile.json feature_name_1.json feature_name_2.json
- When loading to d3.json be sure to be loading the feature you want:
    + topojson.feature(jsonResponse, jsonResponse.objects.feature_name_1).features
- Play around with the projection scale to fit the map

    
### Other sites to download shapefiles from    
- https://www.statsilk.com/maps/download-free-shapefile-maps#download-country-shapefile-maps
- https://wiki.openstreetmap.org/wiki/Shapefiles

## GADM License
This project uses maps from gadm and therefore needs to use the same license if the same map data is used
https://gadm.org/license.html