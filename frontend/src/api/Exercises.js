import millImage from '@/assets/temporary/mill.png';
import legsUpImage from '@/assets/temporary/legsup.png';
import leftLungeImage from '@/assets/temporary/leftlunge.png';
import rightLungeImage from '@/assets/temporary/rightlunge.jpg';
import LegsDownImage from '@/assets/temporary/legsdown.png';

const exercises = [
    { name:'Mill', image: millImage, link:'/exercise'},
    { name:'Legs up', image: legsUpImage, link:'/exercise'},
    { name:'Left leg lunge', image: leftLungeImage, link:'/exercise'},
    { name:'Right leg lunge', image: rightLungeImage, link:'/exercise'},
    { name:'Legs down', image: LegsDownImage, link:'/exercise'}
]
  
function getExercises(okCallback) {
    setTimeout(() => okCallback(exercises), 3000)
}
  
export default { getExercises }