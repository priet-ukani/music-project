// SVG path data for Indian states and regions
// Simplified coordinates based on actual geography

export const indiaMapPaths = {
  // Northern Region
  jammuKashmir: {
    d: "M 180 50 L 200 45 L 220 50 L 230 60 L 225 75 L 210 80 L 190 75 L 175 65 Z",
    name: "Jammu & Kashmir",
    region: "kashmir"
  },
  punjab: {
    d: "M 200 85 L 220 80 L 235 90 L 230 105 L 215 110 L 200 105 Z",
    name: "Punjab",
    region: "punjab"
  },
  haryana: {
    d: "M 215 110 L 230 105 L 240 115 L 235 125 L 220 125 L 210 120 Z",
    name: "Haryana",
    region: "punjab"
  },
  rajasthan: {
    d: "M 170 110 L 210 120 L 220 145 L 230 170 L 215 195 L 180 190 L 160 170 L 150 140 Z",
    name: "Rajasthan",
    region: "rajasthan"
  },
  
  // Eastern Region
  westBengal: {
    d: "M 340 180 L 360 175 L 375 185 L 380 200 L 370 215 L 355 210 L 340 200 Z",
    name: "West Bengal",
    region: "bengal"
  },
  assam: {
    d: "M 400 170 L 425 165 L 445 175 L 455 185 L 445 195 L 420 190 L 405 185 Z",
    name: "Assam",
    region: "assam"
  },
  nagaland: {
    d: "M 455 185 L 470 180 L 480 190 L 475 200 L 460 200 L 450 195 Z",
    name: "Nagaland",
    region: "nagaland"
  },
  manipur: {
    d: "M 460 200 L 475 200 L 480 210 L 475 220 L 460 218 L 455 210 Z",
    name: "Manipur",
    region: "manipur"
  },
  
  // Western Region
  maharashtra: {
    d: "M 220 240 L 260 235 L 280 250 L 285 275 L 270 290 L 240 285 L 220 270 Z",
    name: "Maharashtra",
    region: "maharashtra"
  },
  
  // Southern Region
  kerala: {
    d: "M 240 380 L 255 375 L 265 390 L 268 415 L 260 435 L 245 430 L 238 410 Z",
    name: "Kerala",
    region: "kerala"
  },
  tamilNadu: {
    d: "M 265 340 L 290 335 L 310 350 L 315 380 L 305 410 L 280 415 L 268 415 L 265 390 L 270 365 Z",
    name: "Tamil Nadu",
    region: "tamilnadu"
  },
  
  // Additional states (non-clickable for this project, but shown for completeness)
  uttarPradesh: {
    d: "M 240 125 L 280 120 L 310 140 L 315 160 L 300 175 L 270 170 L 245 155 Z",
    name: "Uttar Pradesh",
    region: null
  },
  madhyaPradesh: {
    d: "M 230 170 L 270 170 L 300 185 L 310 210 L 290 230 L 260 235 L 230 220 Z",
    name: "Madhya Pradesh",
    region: null
  },
  bihar: {
    d: "M 300 175 L 330 170 L 345 180 L 340 195 L 320 195 L 305 185 Z",
    name: "Bihar",
    region: null
  },
  odisha: {
    d: "M 320 195 L 340 200 L 350 220 L 345 245 L 325 250 L 310 235 L 310 210 Z",
    name: "Odisha",
    region: null
  },
  jharkhand: {
    d: "M 330 195 L 345 190 L 355 200 L 350 215 L 335 215 L 325 205 Z",
    name: "Jharkhand",
    region: null
  },
  chhattisgarh: {
    d: "M 310 210 L 325 205 L 340 220 L 335 240 L 315 240 Z",
    name: "Chhattisgarh",
    region: null
  },
  gujarat: {
    d: "M 150 170 L 180 165 L 200 180 L 210 210 L 195 235 L 165 230 L 145 205 Z",
    name: "Gujarat",
    region: null
  },
  karnataka: {
    d: "M 240 285 L 270 290 L 280 310 L 285 335 L 265 340 L 245 330 L 235 305 Z",
    name: "Karnataka",
    region: null
  },
  andhraPradesh: {
    d: "M 285 275 L 315 270 L 335 285 L 340 310 L 325 335 L 290 335 L 280 310 Z",
    name: "Andhra Pradesh",
    region: null
  },
  telangana: {
    d: "M 285 250 L 310 245 L 320 260 L 315 275 L 295 275 Z",
    name: "Telangana",
    region: null
  },
  goa: {
    d: "M 220 270 L 235 268 L 240 280 L 235 290 L 222 285 Z",
    name: "Goa",
    region: null
  },
};

export const indiaOutline = `
  M 150 40 
  L 180 35 L 220 40 L 240 50 L 250 70 L 260 90 
  L 280 100 L 320 95 L 360 100 L 400 110 L 440 130 
  L 470 150 L 485 175 L 490 200 L 485 225 L 470 245 
  L 450 260 L 430 270 L 410 275 L 390 280 L 370 285 
  L 350 295 L 330 310 L 315 330 L 305 355 L 298 380 
  L 292 405 L 285 425 L 278 440 L 268 450 L 255 455 
  L 245 450 L 240 440 L 238 425 L 240 405 L 245 385 
  L 248 365 L 250 345 L 248 325 L 243 305 L 235 285 
  L 225 265 L 215 245 L 205 225 L 195 205 L 185 185 
  L 175 165 L 165 145 L 158 125 L 153 105 L 150 85 
  L 148 65 L 150 40 Z
`;
