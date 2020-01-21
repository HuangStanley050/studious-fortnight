//api call to discover all available badges, hard coded for now:
const badges = [
  {id: 1, name: "Journey Starter", unlocked: true, description: "Well done on starting your journey!", image_url: "https://racquetapp.herokuapp.com/assets/brands/wilson-logo-93d269bd37dc60cdb1fb9b4aec17f6f87c14f47a3c60e500150adec642d1d9c5.png"}, 
  {id: 2, name: "Consistency", unlocked: true, description: "You achieved 5 days meditating in a row!", image_url: "https://racquetapp.herokuapp.com/assets/brands/head-logo-425cdc7f8b190180d5acba27bcc0d497e34e2df69f18659f238c74289e1a6f0d.png"},
  {id: 3, name: "Intermediate Meditator", unlocked: true, description: "Well done on completing the beginner meditation course.", image_url: "https://racquetapp.herokuapp.com/assets/brands/yonex-logo-38a20eba05fb7a5b5594c3de96c63de8e589c4c49c07742ca462e726539ee0ac.png"},
  {id: 4, name: "Advanced Meditator", unlocked: false, description: "Well done on completing the intermediate meditation course.", image_url: "https://racquetapp.herokuapp.com/assets/brands/babolat-logo-558f959d971f15d6f87d4d6fc1069418aa58189c9730abd4d593b7db5be97991.png"},
  {id: 5, name: "Master Meditator", unlocked: false, description: "Well done on completing the intermediate meditation course.", image_url: "https://racquetapp.herokuapp.com/assets/brands/dunlop-logo-7ed27c770e31998099116739195a820c2806b1249aa64eeeb896f5c33bb6031f.png"},
  {id: 6, name: "Super consistent", unlocked: false, description: "You achieved 10 days meditating in a row!", image_url: "https://racquetapp.herokuapp.com/assets/brands/gamma-logo-0f3eef15b38e90587d805322654d40b37fd47b58cecf689524eccf5f5b1b8f94.png"},
  {id: 7, name: "Ultra consistent", unlocked: false, description: "You achieved 15 days meditating in a row!", image_url: "https://racquetapp.herokuapp.com/assets/brands/prince-logo-ee5ffb1598b4db8d5be0821a173ae6ffa2d8194f47a32ca6e4e65199c0b00284.png"},
  {id: 8, name: "Peacefulness", unlocked: false, description: "You completed over half an hour of total time meditating", image_url: "https://racquetapp.herokuapp.com/assets/brands/prokennex-logo-f12024b8215afc70161b541f75114af0e15a6a35bff2460f280006cc97037214.png"}, 
  {id: 9, name: "True Peace", unlocked: false, description: "You completed over an hour of total time meditating", image_url: "https://racquetapp.herokuapp.com/assets/brands/technifibre-logo-d9f5a85904ac0dd32c84a0987f78e236e27c6e9710f192fb0f250f381208105b.png"}, 
  {id: 10, name: "Zen master", unlocked: false, description: "You completed over 100 hours of total time meditating", image_url: "https://racquetapp.herokuapp.com/assets/brands/volkl-logo-11c1639c061d90f26452674e5e9fabf1f14845cfaa6ada5de0c4a1520f44e7a9.png"}
]

export default badges;