//api call to discover all available courses, hard coded for now:

//what we actually get back:

// [
//   {
//       "courseDetail": {
//           "difficulty": "beginner",
//           "levels": 3,
//           "music": "testmusic.mp3"
//       },
//       "meditationId": [
//           "5e279d2d53efda5eac2b0094",
//           "5e279d2e53efda5eac2b0095",
//           "5e279d2e53efda5eac2b0096"
//       ],
//       "_id": "5e279d2d53efda5eac2b0093",
//       "createdAt": "2020-01-22T00:54:05.662Z",
//       "updatedAt": "2020-01-22T00:54:06.717Z",
//       "__v": 1
//   }
// ]

const courses = [
  {
    id: 1, 
    name: "Beginner", 
    duration: "3 minutes",
    totalLessons: "3", 
    image_url: "https://cdn.mindful.org/how-to-meditate.jpg?q=80&fm=jpg&fit=crop&w=1920&h=1080", 
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio culpa inventore aperiam reiciendis? Mollitia minima aspernatur voluptatum aut sunt. Iste, rem. Architecto aspernatur, voluptates accusantium officiis deserunt velit ut quas rerum iste odio! Deserunt nam provident quidem voluptate odio labore quia, ex nesciunt magnam nemo itaque reprehenderit distinctio aliquam!",
    courseId: ""
  },{
    id: 2, 
    name: "Intermediate", 
    duration: "5 minutes",
    totalLessons: "5", 
    image_url: "https://cdn.mindful.org/focus3.png?q=80&fm=jpg&fit=crop&w=500&h=375",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio culpa inventore aperiam reiciendis? Mollitia minima aspernatur voluptatum aut sunt. Iste, rem. Architecto aspernatur, voluptates accusantium officiis deserunt velit ut quas rerum iste odio! Deserunt nam provident quidem voluptate odio labore quia, ex nesciunt magnam nemo itaque reprehenderit distinctio aliquam!",
    courseId: ""
  },{
    id: 3, 
    name: "Expert", 
    duration: "10 minutes",
    totalLessons: "10", 
    image_url: "https://cdn.mindful.org/meditate-12.png?q=80&fm=jpg&fit=crop&w=1400&h=875",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio culpa inventore aperiam reiciendis? Mollitia minima aspernatur voluptatum aut sunt. Iste, rem. Architecto aspernatur, voluptates accusantium officiis deserunt velit ut quas rerum iste odio! Deserunt nam provident quidem voluptate odio labore quia, ex nesciunt magnam nemo itaque reprehenderit distinctio aliquam!",
    courseId: ""
  }
];

export default courses;