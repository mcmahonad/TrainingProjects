     
  require(["esri/config",
          "esri/Map",
          "esri/views/MapView",
          "esri/widgets/BasemapGallery",
          "esri/layers/FeatureLayer",
          "esri/widgets/Expand"
          ],
  function(keyConfig, Map, MapView, BasemapGallery, FeatureLayer, Expand){

    // PASTE KEY HERE
    keyConfig.apiKey = ""

    const map = new Map({
      basemap: "arcgis-topographic"
    });
          
    const view = new MapView({
      map:map,
      center:[-77.45, 37.55],
      zoom: 11,
      container:"viewDiv"
    });
          
    const basemapGallery = new BasemapGallery({
      view: view,
      container: document.createElement("div"),
      source: {
        query: {
          title:'"World Basemaps for Developers" AND owner:esri'
        }
      }
    });
    
    const bgExpand = new Expand({
      view:view,
      content:basemapGallery
    });
  
    const municipalPopup = {
      title: "{NAME}",
      content: [{
        type: "fields",
        fieldInfos: [
          {
          fieldName: "JURISTYPE",
          label: "Jurisdiction Type: "
          },
          {
          fieldName: "AREASQMI",
          label: "Area (sq. miles)",
          format: {
            places: 2
            }
          }
        ]
      }]
    }

    const municipalPoly = new FeatureLayer({
      url: "https://gismaps.vdem.virginia.gov/arcgis/rest/services/VA_Base_Layers/VA_Admin_Boundaries_Clipped/FeatureServer/1",
      outFields: ["NAME", "JURISTYPE", "AREASQMI"],
      popupTemplate: municipalPopup
    }); 
    
  view.ui.add(bgExpand, "top-right");     
  map.add(municipalPoly);

  });