require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer = require('multer')

const app = express()
app.use(cors())
app.use(express.json())
const upload = multer({ storage: multer.memoryStorage() })

// Common mock mechanics
const mechanics = {
  car: [
    { name: 'Joe’s Auto Garage', rating: '4.5 ⭐', eta: '30 min' },
    { name: 'Speedy Car Care', rating: '4.2 ⭐', eta: '45 min' },
  ],
  bike: [
    { name: 'TwoWheeler Experts', rating: '4.6 ⭐', eta: '20 min' },
    { name: 'BikeFix Hub', rating: '4.3 ⭐', eta: '30 min' },
  ]
}

// Parts catalog for demo
const partsCatalog = {
  flat_tire: [
    { name: 'Car Spare Tire', price: '₹3,500', vendors: ['Amazon','Flipkart'] },
    { name: 'Tire Valve',    price: '₹150',  vendors: ['Amazon'] },
  ],
  dead_battery: [
    { name: '12V Car Battery',      price: '₹4,200', vendors: ['Amazon','Snapdeal'] },
    { name: 'Battery Terminal Kit', price: '₹200',   vendors: ['Flipkart'] },
  ],
  brake_pads: [
    { name: 'Ceramic Brake Pads', price: '₹2,000', vendors: ['Amazon','Flipkart'] },
  ],
  oil_change: [
    { name: '5W-30 Engine Oil (1L)', price: '₹800',  vendors: ['Amazon','Flipkart'] },
    { name: 'Oil Filter',           price: '₹500',  vendors: ['Amazon'] },
  ],
  bike_flat_tire: [
    { name: 'Bike Inner Tube',    price: '₹400', vendors: ['Amazon','Flipkart'] },
    { name: 'Patch Kit',          price: '₹100', vendors: ['Amazon'] },
  ],
  bike_chain: [
    { name: 'Bike Chain (116L)',  price: '₹600', vendors: ['Amazon','Snapdeal'] },
    { name: 'Chain Lube Spray',   price: '₹150', vendors: ['Flipkart'] },
  ],
  bike_brakes: [
    { name: 'Bike Brake Pads',    price: '₹350', vendors: ['Amazon'] },
    { name: 'Brake Cable Set',    price: '₹200', vendors: ['Flipkart'] },
  ],
  bike_spark_plug: [
    { name: 'Bike Spark Plug',    price: '₹250', vendors: ['Amazon','Flipkart'] },
  ],
}

// Helper function to check if text contains any of a list of related terms
function containsRelatedTerms(inputText, terms) {
  return terms.some(term => inputText.includes(term));
}

// Diagnosis logic
function diagnoseIssue(symptomText) {
  const text = symptomText.toLowerCase()

  // CAR ISSUES
  if (containsRelatedTerms(text, ['flat tire', 'puncture', 'tire issue', 'flat'])) {
    return {
      issue: 'Flat Tire',
      steps: [
        'Secure vehicle on level ground and apply handbrake',
        'Use jack to lift the car',
        'Loosen lug nuts and remove wheel',
        'Replace inner tube or mount spare tire',
        'Tighten lug nuts in star pattern and lower car',
      ],
      parts: partsCatalog.flat_tire,
      mechanic: mechanics.car[0]
    }
  }
  if (containsRelatedTerms(text, ['dead battery', 'won’t start', 'battery', 'battery dead'])) {
    return {
      issue: 'Dead Battery',
      steps: [
        'Turn off all electrical loads',
        'Connect jumper cables to donor vehicle',
        'Start donor vehicle and then your car',
        'Let engine run for 10 minutes',
        'Replace battery if it fails to hold charge',
      ],
      parts: partsCatalog.dead_battery,
      mechanic: mechanics.car[1]
    }
  }
  if (containsRelatedTerms(text, ['brake', 'squeak', 'stopping issue', 'brake pad'])) {
    return {
      issue: 'Worn Brake Pads',
      steps: [
        'Loosen lug nuts and lift car with jack',
        'Remove wheels to access caliper',
        'Remove caliper and old brake pads',
        'Install new brake pads and reassemble',
        'Pump brake pedal and test stopping distance',
      ],
      parts: partsCatalog.brake_pads,
      mechanic: mechanics.car[0]
    }
  }
  if (containsRelatedTerms(text, ['oil change', 'oil leak', 'engine oil', 'low oil'])) {
    return {
      issue: 'Oil Change / Leak Check',
      steps: [
        'Warm engine to operating temperature',
        'Place drain pan and remove drain plug',
        'Replace oil filter',
        'Refill engine oil to specified level',
        'Inspect for leaks under car',
      ],
      parts: partsCatalog.oil_change,
      mechanic: mechanics.car[1]
    }
  }

  // BIKE ISSUES
  if (containsRelatedTerms(text, ['bike', 'flat tire', 'bike tire issue', 'puncture'])) {
    return {
      issue: 'Bike Flat Tire',
      steps: [
        'Turn bike upside down or use stand',
        'Remove wheel and deflate tube fully',
        'Patch puncture or replace inner tube',
        'Reinstall wheel and inflate to correct pressure',
        'Spin wheel to ensure no wobble',
      ],
      parts: partsCatalog.bike_flat_tire,
      mechanic: mechanics.bike[0]
    }
  }
  if (containsRelatedTerms(text, ['chain', 'slip', 'derailleur', 'loose chain'])) {
    return {
      issue: 'Loose / Worn Chain',
      steps: [
        'Shift to smallest sprocket',
        'Loosen rear axle nuts',
        'Adjust chain tensioner to remove slack',
        'Retighten axle nuts and check alignment',
        'Lubricate chain with lube spray',
      ],
      parts: partsCatalog.bike_chain,
      mechanic: mechanics.bike[1]
    }
  }
  if (containsRelatedTerms(text, ['brake', 'bike', 'braking issue', 'bike brake'])) {
    return {
      issue: 'Bike Brake Adjustment',
      steps: [
        'Loosen brake cable anchor bolt',
        'Squeeze brake lever to set pad position',
        'Retighten the anchor bolt',
        'Trim excess cable and cap end',
        'Test lever pressure and stopping power',
      ],
      parts: partsCatalog.bike_brakes,
      mechanic: mechanics.bike[0]
    }
  }
  if (containsRelatedTerms(text, ['spark', 'misfire', 'stall', 'engine misfire'])) {
    return {
      issue: 'Spark Plug Issue',
      steps: [
        'Remove spark plug cap',
        'Use spark plug socket to extract plug',
        'Inspect for fouling or gap wear',
        'Replace with correct-gap spark plug',
        'Reinstall and test engine start',
      ],
      parts: partsCatalog.bike_spark_plug,
      mechanic: mechanics.bike[1]
    }
  }

  // DEFAULT
  return {
    issue: 'Unknown Issue',
    steps: ['Please provide more detailed symptoms or bring your vehicle in for inspection.'],
    parts: [],
    mechanic: null
  }
}

// Endpoint for diagnosis
app.post('/api/diagnose', upload.single('image'), (req, res) => {
  const symptom = req.body.symptom || ''
  const result = diagnoseIssue(symptom)
  res.json(result)
})

// Dynamic Port Logic
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5000
const MAX_RETRIES = 5

function startServer(port, retries = 0) {
  const server = app.listen(port, () => {
    console.log(`🚀 RepairIQ demo server running on http://localhost:${port}`)
  })

  server.on('error', err => {
    if (err.code === 'EADDRINUSE' && retries < MAX_RETRIES) {
      console.warn(`⚠️  Port ${port} in use, trying ${port + 1}…`)
      startServer(port + 1, retries + 1)
    } else {
      console.error('❌ Server failed to start:', err)
      process.exit(1)
    }
  })
}

// Start server
startServer(DEFAULT_PORT)
