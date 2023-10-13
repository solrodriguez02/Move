import millImage from '@/assets/temporary/mill.png';
import legsUpImage from '@/assets/temporary/legsup.png';
import leftLungeImage from '@/assets/temporary/leftlunge.png';
import rightLungeImage from '@/assets/temporary/rightlunge.jpg';
import LegsDownImage from '@/assets/temporary/legsdown.png';

const exercises = [
    { name:'Mill', difficulty:'medium', muscleGroups:'glutes', elements:'none', space:'Ideal for reduced spaces', description:'...', image: millImage, link:'/exercise'},
    { name:'Legs up', difficulty:'medium', muscleGroups:'glutes', elements:'none', space:'Ideal for reduced spaces', description:'...', image: legsUpImage, link:'/exercise'},
    { name:'Left leg lunge', difficulty:'medium', muscleGroups:'glutes', elements:'none', space:'Ideal for reduced spaces', description:'...', image: leftLungeImage, link:'/exercise'},
    { name:'Right leg lunge', difficulty:'medium', muscleGroups:'glutes', elements:'none', space:'Ideal for reduced spaces', description:'...', image: rightLungeImage, link:'/exercise'},
    { name:'Legs down', difficulty:'medium', muscleGroups:'glutes', elements:'none', space:'Ideal for reduced spaces', description:'...', image: LegsDownImage, link:'/exercise'}
]
  
function getExercises(okCallback) {
    setTimeout(() => okCallback(exercises), 3000)
}
  
export default { getExercises }