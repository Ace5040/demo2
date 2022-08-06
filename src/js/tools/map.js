
function getCustomCoorinates(components) {
  let coords = [],
  lat = components[0].component.getValue(),
  routeLat = components[1].component.getValue(),
  lon = components[2].component.getValue(),
  routeLon = components[3].component.getValue()
  coords[0] = routeLat === "N" ? lat : lat * -1
  coords[1] = routeLon === "E" ? lon : lon * -1
  return coords;
}

function setCustomCoorinates(component,route,coords) {
  const nameMarker = component.name.toLowerCase(),
  isLat = nameMarker.includes("lat")

   if(coords) component.setValue(+coords[isLat ? 0 : 1 ])
  
  let value = component.getValue()
  if(value < 0) {
    route.setValue(isLat ? 'S' : 'W' )
    component.setValue(Math.abs(value))
  }

}

export { getCustomCoorinates, setCustomCoorinates };
