/**
 * Run once to seed default testimonials:
 * node seedTestimonials.js
 */
require('dotenv').config()
const mongoose   = require('mongoose')
const Testimonial = require('./models/Testimonial')
const TESTIMONIALS = [
{
name: 'Anurag Dubey',
role: 'Web Dev Student, Gorakhpur',
content: 'Sir ka teaching style kaafi practical hai. Concepts sirf explain nahi karte, directly code karvate hain. MERN Stack ka real workflow samajh aaya jab humne ek small project start se build kiya.',
rating: 5
},

{
name: 'Pooja Singh',
role: 'Web Dev Student, Gorakhpur',
content: 'Classes ka best part ye tha ki har topic ke baad real example milta tha. React ka state aur props mujhe pehle confusing lagta tha, but sir ne itna simple bana diya ki ab easily use kar leti hoon.',
rating: 5
},

{
name: 'Durgawati Kumari',
role: 'Web Dev Student, Gorakhpur',
content: 'Learning environment bahut supportive tha. Agar koi doubt reh bhi jata tha toh next session mein clear ho jata tha. Mujhe specially debugging aur logical thinking mein kaafi improvement feel hua.',
rating: 5
},

{
name: 'Shivam Srivastava',
role: 'Web Dev, ITM College, Gida, Gkp',
content: 'Honestly bolun toh start mein coding boring lagti thi, but sir ki classes kaafi engaging hoti hain. Jab humne apna first full-stack mini project banaya tab confidence boost ho gaya.',
rating: 5
},

{
name: 'Aaryan Rai',
role: 'Web Dev, KIPM College, Gida, Gkp',
content: 'MongoDB aur backend ka part mujhe tough lagta tha, lekin jab API banana practically sikhaya gaya tab pura flow samajh aaya. Ab khud small apps bana leta hoon.',
rating: 5
},

{
name: 'Harshita',
role: 'Web Dev, KIPM College, Gida, Gkp',
content: 'Classes well structured hoti hain. Step by step approach hai so beginners bhi easily follow kar sakte hain. React components aur project structure samajhna easy ho gaya.',
rating: 5
},

{
name: 'Roshni Singh',
role: 'Web Dev, KIPM College, Gorakhpur',
content: 'Theory aur practical ka balance perfect hai. Sir pehle concept explain karte hain phir usko code mein implement karvate hain. Is approach se learning kaafi effective ho jati hai.',
rating: 5
},

{
name: 'Shejal Hamal',
role: 'Web Dev Student, Bareilly',
content: 'Even online classes were very interactive. Screen sharing aur live coding sessions se sab clearly samajh aata tha. Distance learning bhi bilkul effective laga.',
rating: 5
},

{
name: 'Rishu Pandey',
role: 'Web Dev, MGPG College, Gkp',
content: 'Sir ke guidance se maine apna first proper web project complete kiya. Pehle sirf basics aate the but ab pura workflow samajh aa gaya hai.',
rating: 5
},

{
name: 'Priya Verma',
role: 'Python Student, Gorakhpur',
content: 'Python learning journey kaafi smooth rahi. Concepts jaise loops, functions aur OOP real examples ke saath samjhaye gaye, isliye quickly clear ho gaye.',
rating: 5
},

{
name: 'Rohit Kumar',
role: 'Python Learner, Gorakhpur',
content: 'Sir ka explanation style simple aur logical hai. Har concept previous concept se connect hota hai, isliye Python ka structure easily samajh aata gaya.',
rating: 5
},

{
name: 'Anjali Mishra',
role: 'Python Batch, Acme Institute',
content: 'Assignments aur practice tasks kaafi helpful the. Sirf theory nahi, actual coding practice karne ko milti thi. Isi wajah se concepts strong hue.',
rating: 5
},

{
name: 'Deepak Sharma',
role: 'AI Tools Student, Gorakhpur',
content: 'AI tools ka professional use kaise karna hai ye sessions mein clearly sikhaya gaya. ChatGPT aur Copilot ko coding workflow mein use karna ab natural lagta hai.',
rating: 5
},

{
name: 'Neha Gupta',
role: 'AI Tools & Web Dev',
content: 'Productivity improve karne ke liye AI tools kaise use karte hain ye bahut clearly explain kiya gaya. Practical demonstrations se kaafi new ideas mile.',
rating: 5
}
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    const count = await Testimonial.countDocuments()
    if (count > 0) {
      console.log(`⚠️  ${count} testimonials already exist. Skipping seed.`)
      console.log('   To re-seed, delete existing testimonials first.')
    } else {
      await Testimonial.insertMany(TESTIMONIALS.map(t => ({ ...t, isVisible: true })))
      console.log(`✅ Seeded ${TESTIMONIALS.length} testimonials!`)
    }
  } catch (err) {
    console.error('❌ Seed failed:', err.message)
  } finally {
    await mongoose.connection.close()
    console.log('Connection closed.')
    process.exit(0)
  }
}

seed()